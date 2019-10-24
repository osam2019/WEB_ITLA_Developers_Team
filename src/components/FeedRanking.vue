<template>
    <div style="display: flex; margin: auto; height: 35em">

        <!--피드 관련된 부분-->
        <div id = "feeds" style="float: left; width:35%; height: 100%">
            <div>
                <el-input v-model="search"
                        size="nomal"
                        placeholder="Type to search"
                        style="height: 6%"
                        prefix-icon="el-icon-search"/>
                </div>
            <!--sendUrl은 reader에 보내는 props인 reader_web_info 값을 변경하는 함수 -->
            <!--피드들 불러와서 보여주는 부분-->
            <el-table
                    @cell-click = "sendUrl"
                    empty-text="결과가 없습니다."
                    :data="this.$data.props_feed_data.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%;"
                    height="88%">
                <!--width는 colum 간 거리를 보고 적당히 정한 값-->
                <el-table-column
                        width="120%"
                        label="category"
                        prop="category">
                </el-table-column>
                <el-table-column
                        width="280%"
                        label="Title"
                        prop="title">
                </el-table-column>
                <el-table-column

                        sortable
                        width="120%"
                        label="Date"
                        prop="date">
                </el-table-column>
                <el-table-column
                        width="80%"
                        align="right">
                    <template slot-scope="scope">
                        <!--삭제 버튼 관련 부분-->
                        <el-button
                                icon = "el-icon-delete-solid"
                                size="mini"
                                type="danger"
                                style="height: 6%"
                                @click.stop="handleDelete(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--피드를 추가하는 버튼 관련-->
            <div id ="add_button" style="position: relative">
                <el-button
                    size="mini"
                    type="primary"
                    @click.stop = "dialogFormVisible = true"
                    style="width: 100%; position: absolute;bottom: -2.5em; left: 0"><span style="font-size: 130%">Add</span></el-button>

                <!--피드 추가 하면 dialog 팝업되는 부분-->
                <el-dialog title="피드 추가" :visible.sync="dialogFormVisible">
                    <!--각종 폼들-->
                    <el-form :model="form">
                        <el-form-item label="Category" :label-width="formLabelWidth" style="width:100%">
                            <el-select v-model="form.category" placeholder="Select" style="width:100%" >
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Title" :label-width="formLabelWidth">
                            <el-input v-model="form.title" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Date" :label-width="formLabelWidth">
                            <el-date-picker
                                    v-model="form.date"
                                    placeholder="날짜"
                                    value-format = "yyyy-MM-dd"
                                    style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="Url" :label-width="formLabelWidth">
                            <el-input placeholder="Please input" v-model="form.url">
                                <template slot="prepend">Http://</template>
                            </el-input>
                        </el-form-item>
                    </el-form>

                    <!--확인, 취소 버튼-->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="Create">Confirm</el-button>
                    </span>

                </el-dialog>
            </div>
        </div>
        <!--float 취소해주는 부분-->
        <div style="clear: both"></div>

        <!--리더부분. web_info(row 값 전체) 를 전달한다. -->
        <div id = "reader" v-if="reader_web_info" style="width: 100%;" >
            <feed-reader v-bind:props="reader_web_info" style="width: 98%; height: 100%; margin: auto; overflow: hidden" ></feed-reader>
        </div>
    </div>
</template>

<script>
    import FeedReader from "./Feedreader";
    import axios from 'axios'; // import axios for Communication with json
    import {baseURL_feed} from "../main";
    import {baseURL_user} from "../main";

    export default {

        name: "FeedRanking",
        data() {
            return {
                props_feed_data:[ ],//서버에서 피드 받아와서 저장함
                props_user_data:[],//서버에서 유저 받아와서 저장함
                options: [{
                    value: '0',
                    label: 'Software'
                }, {
                    value: '1',
                    label: 'Hardware'
                }, {
                    value: '2',
                    label: 'Technology'
                }, {
                    value: '3',
                    label: 'Tips'
                }, {
                    value: '4',
                    label: 'Reviews'
                }, {
                    value: '5',
                    label: 'Misc'
                }], //추가할 때 카테고리 선택하려면 필요함
                formLabelWidth: '120px', //폼 부분 크기
                dialogFormVisible: false,//dialog 보이고 숨기기 위한 변수
                reader_web_info :"",//reader가 화면 보여줄 떄 필욯ㅁ
                form: {
                    category:'',
                    title: '',
                    date: '',
                    url: '',
                    rate: null,
                },
                search: '',
            }
        },
        methods: {
            log(inp){
                console.log(inp);
            },
            handleDelete(index, row) {
                if(this.$store.getters.getLoginedID === row.madeBy){
                    let target_url = 'http://localhost:3000/feeds/'+ row.id;
                    axios.delete(target_url)
                        .then(resp => {
                            console.log(resp.data)
                        }).catch(error => {
                        console.log(error);
                    });
                    this.$data.reader_web_info = null;
                }
                else {
                    this.$message.error("You can only delete your own feed!");
                }
            },
            sendUrl(row,column,e){
                this.$data.reader_web_info = row; //row를 하위 컴포넌트에 전달
            },
            Create(){
                let madeBy = this.$store.getters.getLoginedID;
                this.$data.form = {...this.$data.form, madeBy};
                this.$data.form.url = "http://" + this.$data.form.url;
                this.$data.dialogFormVisible = false;
                axios.post(baseURL_feed, this.$data.form);
                this.$data.form = {category:'',date: '',title: '', url: '',rate:'',madeBy:''};

            },

            makeCategory () {//정수 값을 카테고리로
                let temp = -1;
                for(let feedsCount = 0; feedsCount < this.props_feed_data.length ; feedsCount++){
                    temp = parseInt(this.props_feed_data[feedsCount].category);
                    this.props_feed_data[feedsCount].category = this.$store.state.feedCategories[temp];
                }
            }
        },
        async created() {// 데이터 불러옴
            try {
                const res = await axios.get(baseURL_feed);
                this.props_feed_data = res.data;
                this.makeCategory();

                const res2 = await axios.get(baseURL_user);
                this.props_user_data = res2.data;
                this.$data.loginID = this.$store.state.loginID;
            } catch(e) {
                console.error(e)
            }
        },
        components:{
            FeedReader,
        },
    }

</script>

<style scoped>
</style>