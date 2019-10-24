<!--
세팅
사용 데이터:  User Attribute
1. 로그인 상태일 떄
    비밀번호 변경 기능, 카테고리 설정 기능


-->


<template>
    <div id="main_wrap">
        <!--로그인 했을 때-->
        <div id="login_true" style="display: flex;">
            <!--카테고리 선택 항목-->

            <div id="category_wrap" style="float: left; width:50%;">
                <h1>카테고리 편집</h1>
                <el-main id="list" style="">
                    <div style="display: flex;margin-bottom: 0.5%">
                        <el-input
                                auto-complete="true"
                                v-model.lazy="search_target"
                                size="large"
                                placeholder="검색어를 입력하세요"
                                style="float: left; width:100%;margin-right: 0.5%"
                        />
                        <el-button @click="Create" style="float: left">create</el-button>
                    </div>


                    <el-table class="category_edit" header-row-style="display:none;" style="font-size: 21px"
                              :data="this.$data.UserCategory.filter(data => !search_target || data.category.toLowerCase().includes(search_target.toLowerCase()))">
                        <el-table-column
                                align="left">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="category">
                        </el-table-column>
                        <el-table-column
                                align="right">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="Edit(scope.$index, scope.row)">Edit
                                </el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="Delete(scope.$index, scope.row)">Delete
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-main>
            </div>
            <div class="clear"></div>

            <!-- 비밀번호 변경 항목-->
            <div id="change_password" style="width: 50%; text-align: center;"  >
                    <h1 id="password_head">비밀번호 변경</h1>
                    <el-main style="display: inline-flex;">
                        <div style="margin-right: 0.5%;">
                            <el-input type="password" v-model="new_password" placeholder="비밀번호는 6자리 이상입니다" show-password
                                      style="margin-bottom: 1%"></el-input>
                            <el-input type="password" v-model="confirm" placeholder="비밀번호 확인" show-password></el-input>
                        </div>
                        <el-button id="submit" type="primary" @click="confirmingPassword(new_password,confirm)"
                                   style="width: 100px">확인
                        </el-button>
                    </el-main>
            </div>
        </div>


<!--        &lt;!&ndash;로그인 하지 않았을 떄&ndash;&gt;-->
<!--        <div id="login_false">-->
<!--            <img src="https://www.freeiconspng.com/uploads/error-icon-4.png" width="300" height="300">-->
<!--            <p>로그인 해 주십시오</p>-->
<!--        </div>-->
    </div>

</template>

<script>
    function changePassword(new_password) {
        alert("비밀번호가 변경되었습니다")
    }

    export default {
        name: "Setting",
        data() {
            return {
                process_state: "primary",
                search_target: "",
                confirm: "",
                new_password: "",
                visible: false,
                UserCategory: [
                    {
                        "category": "product",

                    },
                    {
                        "category": "review",

                    },
                    {
                        "category": "game",

                    },
                    {
                        "category": "tech",

                    },
                    {
                        "category": "news",

                    },
                    {
                        "category": "info"
                    },
                    {
                        "category": "Apple"
                    }
                ]

            }
        },
        methods: {
            Edit(index, row) {
                row.category = prompt("변경할 카테고리를 입력하세요");
            },
            Delete(index, row) {
                this.$data.UserCategory.splice(index, 1);
                console.log(this.$data.UserCategory)
            },
            Create() {
                this.$data.UserCategory.push({category: prompt("데이터를 입력하세요")});
                console.log(this.$data.UserCategory)
            },
            confirmingPassword(new_password, confirm) {
                if (new_password == confirm) {
                    changePassword(new_password);
                } else
                    alert("비밀번호 확인이 다릅니다.");
            },
        },

    }
</script>

<style scoped>
    /*    html, body, div{
            height:100%;
            width: 100%;

        }



        #login_false{
            text-align: center;
            height: 50%;
            width: 50%;
            background: white;
            color:black;
            margin: auto;
            border: 1px solid black ;
        }
        #category_wrap,#change_password{
        }
        #list{
            background: wheat;
            min-height: 300px;
        }*/

    .clear {
        clear: both;
    }
</style>