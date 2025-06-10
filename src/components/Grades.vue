<template>
    <v-row class="justify-center align-center">
        <v-chip class="mb-2">
            Average Grade: {{ averageOverall }}
        </v-chip>
    </v-row>
    <v-container class="d-flex flex-column justify-center page-container">
        <p v-if="isRefreshing" class="opacity-50 font-italic ms-4">
            <v-progress-circular indeterminate :size="24"></v-progress-circular>
            <span class="ms-4">Refreshing login token...</span>
        </p>
        <v-tabs v-model="tab" grow class="mb-4">
            <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
                {{ tab.text }}
            </v-tab>
        </v-tabs>
        <v-alert v-if="alertVisible" :type="alertType">
            {{ alertMessage }}
        </v-alert>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item key="recent" value="recent">
                <v-list lines="two" rounded>
                    <v-list-item v-for="grade in gradesAll" :key="grade">
                        <v-row class="align-center mb-2 flex-nowrap">
                            <v-col cols="2" sm="1" class="ms-2 text-center">
                                <v-list-item-title class="text-h5">{{
                                    grade.grade
                                }}</v-list-item-title>
                            </v-col>
                            <v-col class="flex-fill">
                                <p class="font-weight-bold">
                                    {{ grade.subject }}
                                </p>
                                <v-list-item-subtitle>{{
                                    grade.description
                                }}</v-list-item-subtitle>
                            </v-col>
                            <v-col
                                cols="4"
                                class="d-flex bg-surface align-end align-lg-center ga-lg-2 flex-lg-row-reverse flex-column mb-lg-2"
                            >
                                <v-chip
                                    class="mb-2 mb-lg-0"
                                    color="light-blue"
                                    prepend-icon="mdi-weight"
                                >
                                    {{ grade.weight }}
                                </v-chip>
                                <v-list-item-subtitle class="mb-2 mb-lg-0"
                                    >{{ grade.date }}
                                </v-list-item-subtitle>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                    </v-list-item>
                </v-list>
            </v-tabs-window-item>
            <v-tabs-window-item key="subjects" value="subjects">
                <v-expansion-panels multiple v-model="activePanels">
                    <v-expansion-panel
                        v-for="(subject, index) in gradesSubjects"
                        :key="subject"
                    >
                        <v-expansion-panel-title
                            :color="
                                activePanels.includes(index)
                                    ? 'surface-light'
                                    : ''
                            "
                        >
                            <v-col no-gutters>
                                <v-row class="text-h5 mb-2">{{
                                    subject.title
                                }}</v-row>
                                <v-row class="text-caption"
                                    >Average grade: {{ subject.average }}</v-row
                                >
                                <v-row class="text-caption"
                                    >Temporary grade:
                                    {{ subject.temporary }}</v-row
                                >
                            </v-col>
                            <v-col class="text-right text-h6">{{ subject.content.length }} <!-- grade count -->
                            </v-col>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text class="subject-panel">
                            <v-list lines="two">
                                <v-list-item
                                    v-for="grade in subject.content"
                                    :key="grade"
                                >
                                    <v-row
                                        class="align-center mb-1 flex-nowrap"
                                    >
                                        <v-col
                                            cols="auto"
                                            sm="1"
                                            class="ms-2 text-center"
                                        >
                                            <v-list-item-title
                                                v-if="!(editEnabled && editGradeId == grade.Id)"
                                                class="text-h6"
                                                mb-2 mb-lg-0                  >{{
                                                    grade.grade
                                                }}</v-list-item-title
                                            >
                                                <v-text-field
                                                        v-if="editEnabled && editGradeId == grade.Id"
                                                        v-model="newGradeValue"
                                                        variant="outlined"
                                                        class="text-xs-center"
                                                        dense
                                                        hide-details
                                                        @keyup.enter="updateGrade()">
                                                </v-text-field>
                                        </v-col>
                                        <v-col class="flex-fill">
                                            <v-list-item-subtitle>{{
                                                grade.description
                                            }}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle v-if="debugmodecheck">
                                                {{
                                                grade.Id
                                                }}
                                            </v-list-item-subtitle>
                                        </v-col>
                                        <v-col
                                            cols="3"
                                            class="d-flex align-end align-lg-center ga-lg-2 flex-lg-row-reverse flex-column mb-lg-2"
                                        >
                                            <v-chip
                                                v-if="!(editEnabled && editGradeId == grade.Id)"
                                                class="mb-2 mb-lg-0"
                                                color="light-blue"
                                                prepend-icon="mdi-weight"
                                            >
                                                {{ grade.weight }}
                                            </v-chip>
                                            <v-text-field
                                                v-if="editEnabled && editGradeId == grade.Id"
                                                v-model="newWeightValue"
                                                variant="outlined"
                                                class="ma-0 pa-0"
                                                dense
                                                hide-details
                                                @keyup.enter="updateGrade()">
                                            </v-text-field>
                                            <v-list-item-subtitle
                                                class="mb-2 mb-lg-0"
                                                >{{ grade.date }}
                                            </v-list-item-subtitle>
                                        </v-col>
                                            <v-col cols="1">
                                                <v-menu>
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn
                                                            v-bind="props"
                                                            icon="mdi-pencil-outline"
                                                            variant="text"
                                                            size="small"
                                                        ></v-btn>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item
                                                            prepend-icon="mdi-pencil-outline"
                                                            title="Edit Grade"
                                                            @click="editGrade(grade.Id, grade.grade, grade.weight)"
                                                        ></v-list-item>
                                                        <v-list-item
                                                            v-if="grade.Id.includes('predictor')"
                                                            prepend-icon="mdi-trash-can-outline"
                                                            title="Delete Grade"
                                                            @click="deleteGrade(grade.Id, index)"
                                                        ></v-list-item>
                                                    </v-list>
                                                </v-menu>
                                                <v-dialog max-width="500">
                                                  <template v-slot:activator="{ props: detailsActivator }">
                                                    <v-btn
                                                      v-bind="detailsActivator"
                                                      icon="mdi-menu"
                                                      size="small"
                                                      variant="text"
                                                      color="gray"
                                                    ></v-btn>
                                                  </template>
                                                
                                                  <template v-slot:default="{ isActive }">
                                                    <v-card title="Details">
                                                      <v-card-text>
                                                          <p><strong>Theme:</strong> {{ grade.theme && grade.theme.length > 1 ? grade.theme : 'N/A' }}</p>
                                                          <p><strong>Class Rank:</strong> {{ grade.classRank && grade.classRank.length > 1 ? grade.classRank : 'N/A' }}</p>
                                                      </v-card-text>
                                                
                                                      <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                
                                                        <v-btn
                                                          text="Close"
                                                          @click="isActive.value = false"
                                                        ></v-btn>
                                                      </v-card-actions>
                                                    </v-card>
                                                  </template>
                                                </v-dialog>
                                            </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                </v-list-item>
                                <v-row no-gutters class="justify-center align-center">
                                    <v-col cols="5" color="light-green">
                                        <!-- id={{ grade.Id }}-->
                                        <v-btn 
                                            color="light-blue"
                                            variant="tonal"
                                            append-icon="mdi-text-box-plus-outline"
                                            rounded
                                            block
                                            @click.native="addGrade(index)">Add Grade</v-btn>
                                    </v-col>
                                </v-row>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-container>
</template>

<script setup>
import { useRefreshLogin } from "@/composables/useRefreshLogin";
const { isRefreshing } = useRefreshLogin();
</script>

<script>
import { useRefreshLogin } from "@/composables/useRefreshLogin";
const { refreshLogin } = useRefreshLogin();

const d = new Date();

export default {
    data: () => ({
        alertVisible: false,
        alertMessage: "Meow",
        alertType: "info",
        tab: "recent",
        tabs: [
            { value: "recent", text: "Recent", content: [] },
            {
                value: "subjects",
                text: "By Subject",
                content: [],
            },
        ],
        activePanels: [],
        gradesSubjects: [],
        gradesAll: [],
        editEnabled: false,
        editGradeId: "",
        initGradeValue: 0,
        newGradeValue: 0,
        averageOverall: 0
    }),
    mounted() {
        this.getGrades();
    },
    methods: {
        async getGrades() {
            const token = localStorage.getItem("token");
            const url = localStorage.getItem("url");

            if (localStorage.getItem("url") == null) {
                this.alertType = "error";
                this.alertMessage =
                    "Not logged in! Go to the Account page to log in first.";
                this.showAlert();
            } else {
                let head = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                };
                let response = await fetch(`${url}api/3/marks/`, {
                    method: "GET",
                    headers: head,
                });
                let responseJson = await response.json();
                console.log(responseJson);
                if (response.ok == false) {
                    await refreshLogin();
                    await this.getGrades();
                } else {
                    let response = Object.values(responseJson);
                    
                    let iterator = response.values();
                    for (const value of iterator) {
                        //console.log(value);
                        
                    }

                    let allgrades = [];
                    let subjectsGradeCount = 0;

                    // for loop for each subject definition
                    for (let i = 0; i < response[0].length; i++) {
                        // pushing all grades from each subject
                        // into an array to use later
                        allgrades.push(...response[0][i].Marks);
                        let gradeSum = 0;
                        let weightSum = 0;
                        
                        for (let j = 0; j < response[0][i].Marks.length; j++) {
                            if (/\d/.test(response[0][i].Marks[j].MarkText)) {
                                if (response[0][i].Marks[j].MarkText.endsWith('-')) {
                                    gradeSum = gradeSum + (parseInt(response[0][i].Marks[j].MarkText.slice(0, -1)) + 0.5) * parseInt(response[0][i].Marks[j].Weight);
                                    weightSum = weightSum + parseInt(response[0][i].Marks[j].Weight);
                                    //console.log(parseInt(response[0][i].Marks[j].MarkText.slice(0, -1)) + 0.5);
                                } else {
                                    gradeSum = gradeSum + parseInt(response[0][i].Marks[j].MarkText) * parseInt(response[0][i].Marks[j].Weight);
                                    weightSum = weightSum + parseInt(response[0][i].Marks[j].Weight);
                                }
                            }
                        }
                        let temporarygrade =
                            response[0][i].TemporaryMark == null ||
                            response[0][i].TemporaryMark.trim() === ""
                                ? "None"
                                : response[0][i].TemporaryMark;

                        // pushing grades into an array for a subject
                        let subjectGrades = [];

                        for (
                            let j = response[0][i].Marks.length - 1;
                            j >= 0;
                            j--
                        ) {
                            let unixDate = Date.parse(
                                response[0][i].Marks[j].MarkDate,
                            );
                            let date = new Date(unixDate);

                            subjectGrades.push({
                                Id: response[0][i].Marks[j].Id,
                                grade: response[0][i].Marks[j].MarkText,
                                weight: response[0][i].Marks[j].Weight,
                                description: response[0][i].Marks[j].Caption,
                                classRank: response[0][i].Marks[j].ClassRankText,
                                theme: response[0][i].Marks[j].Theme,
                                date: date.toLocaleString(undefined, {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                }),
                            });
                        }

                        if (weightSum == 0) {
                            weightSum = 1 // make sure we dont divide by 0
                        }
                        
                        let averagegrade = Math.round(((gradeSum / weightSum) + Number.EPSILON) * 100) / 100;
                        subjectsGradeCount = subjectsGradeCount + averagegrade;
                        // pushing a subject item into "by subject" grades

                        this.gradesSubjects.push({
                            title: response[0][i].Subject.Name,
                            average: averagegrade,
                            temporary: temporarygrade,
                            content: subjectGrades,
                        });
                    }

                    // recent grades definition
                    let recentgrades = allgrades
                        .sort(function (a, b) {
                            var c = new Date(a.MarkDate);
                            var d = new Date(b.MarkDate);
                            return c - d;
                        })
                        .reverse();
                    //console.log(recentgrades);

                    let subject;

                    // pushing recent grades
                    for (let l = 0; l < recentgrades.length; l++) {
                        subject = response[0].find(
                            (x) => x.Subject.Id === recentgrades[l].SubjectId,
                        ).Subject.Name;

                        let unixDate = Date.parse(recentgrades[l].MarkDate);
                        let date = new Date(unixDate);

                        this.gradesAll.push({
                            grade: recentgrades[l].MarkText,
                            weight: recentgrades[l].Weight,
                            description: recentgrades[l].Caption,
                            subject: subject,
                            date: date.toLocaleString(undefined, {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                            }),
                        });
                    }
                    this.averageOverall = Math.round(((subjectsGradeCount / this.gradesSubjects.length) + Number.EPSILON) * 100) / 100;
                }
            }
        },
        editGrade(btnId, initGrade, initWeight) {
            this.editEnabled = !this.editEnabled;
            this.editGradeId = btnId;
            this.newGradeValue = initGrade;
            this.newWeightValue = initWeight;
            //console.log("editId: ", this.editGradeId);
        },
        updateGrade() {
            const result = this.findIndex(this.editGradeId);

            this.gradesSubjects[result.subjectIndex].content[result.markIndex].grade = this.newGradeValue;
            this.gradesSubjects[result.subjectIndex].content[result.markIndex].weight = this.newWeightValue;

            this.editEnabled = !this.editEnabled;
            this.updateAverage(result.subjectIndex);
        },
        findIndex(markId) {
            for (let i = 0; i < this.gradesSubjects.length; i++) {
                for (let j = 0; j < this.gradesSubjects[i].content.length; j++) {
                    if (this.gradesSubjects[i].content[j].Id == markId) {
                        return { subjectIndex: i, markIndex: j };
                    }
                }
            }
            return null;
        },
        updateAverage(i) {
            let gradeSum = 0;
            let weightSum = 0;
            
                for (let j = 0; j < this.gradesSubjects[i].content.length; j++) {
                    if (/\d/.test(this.gradesSubjects[i].content[j].grade)) {
                        if (this.gradesSubjects[i].content[j].grade.endsWith('-')) {
                            gradeSum = gradeSum + (parseInt(this.gradesSubjects[i].content[j].grade.slice(0, -1)) + 0.5) * parseInt(this.gradesSubjects[i].content[j].weight);
                            weightSum = weightSum + parseInt(this.gradesSubjects[i].content[j].weight);
                        } else {
                            gradeSum = gradeSum + parseInt(this.gradesSubjects[i].content[j].grade) * parseInt(this.gradesSubjects[i].content[j].weight);
                            weightSum = weightSum + parseInt(this.gradesSubjects[i].content[j].weight);
                        }
                    }
                }
                //console.log(gradeSum);
                //console.log(weightSum);
                let averagegrade = Math.round(((gradeSum / weightSum) + Number.EPSILON) * 100) / 100;
                //console.log(this.gradesSubjects[i].average);
                this.averageOverall = Math.round(((this.averageOverall * this.gradesSubjects.length) - this.gradesSubjects[i].average + averagegrade) / this.gradesSubjects.length * 100) / 100;
                
                this.gradesSubjects[i].average = averagegrade;

                //console.log(this.gradesSubjects);
        },
        addGrade(subjectIndex) {
            //console.log(subjectIndex);
            this.newGradeId = "predictor_" + window.crypto.randomUUID();
            this.newGradeDesc = "Custom";
            this.newGradeValue = "N";
            this.newGradeWeight = 1;

            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;

            this.gradesSubjects[subjectIndex].content.push({
                Id: this.newGradeId,
                date: formattedToday,
                description: this.newGradeDesc,
                grade: this.newGradeValue,
                weight: this.newGradeWeight
            });
            //console.log(this.newGradeId);
            this.updateAverage(subjectIndex);
        },
        showAlert() {
            this.alertVisible = true;
        },
        deleteGrade(id, subjectIndex) {
            const result = this.findIndex(id);
            this.gradesSubjects[subjectIndex].content.splice(result.markIndex, 1);
            this.updateAverage(subjectIndex);
        }
    },
};
</script>

<style scoped>
@media (min-width: 1420px) {
    #app .page-container {
        max-width: 1024px;
    }
}
</style>

<style>
#app .subject-panel .v-expansion-panel-text__wrapper {
    padding: 0.5rem;
}
</style>
