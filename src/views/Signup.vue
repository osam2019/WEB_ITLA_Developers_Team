<template>
    <div class="signup">
        <el-card class="signup-card">
            <h2>Signup</h2>
            <el-form class="signupForm" :model="signupForm" status-icon :rules="signupRules" ref="signupForm" @keyup.enter.native="submitForm('signupForm')">
                <el-form-item prop="email">
                    <el-input v-model="signupForm.email" placeholder="E-mail" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="signupForm.password" placeholder="Password" prefix-icon="el-icon-lock" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPassword">
                    <el-input type="password" v-model="signupForm.checkPassword" placeholder="confirm Password" prefix-icon="el-icon-check" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="signup-button" @click="submitForm('signupForm')">Submit</el-button> <br/>
                    <el-button class="reset-button" @click="resetForm('signupForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'; // import axios for Communication with json
    import {baseURL_user} from "../main";
    export default {
        name: "Signup",
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.signupForm.password) {
                    callback(new Error('Two inputs don\'t match!'));
                } else {
                    callback();
                }
            };
            return {
                loading : false,
                // async data
                credentials : [],
                //
                signupForm: {
                    email: '',
                    password: '',
                    checkPassword: ''
                },
                signupRules: {
                    email : [
                        {required : true, message : 'Please input the e-mail', trigger :'blur'},
                        {type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']}
                    ],
                    password: [
                        {required : true, message : "Please input the password", trigger : 'blur'},
                        {min : 6, message : 'Length should be at least 6', trigger : 'change'}
                    ],
                    checkPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },

        async created() {
            try {
                const res = await axios.get(baseURL_user);
                this.credentials = res.data;
            } catch(e) {
                console.error(e)
            }
        },

        methods: {
            openFullScreen() {
                this.$message({
                    message: "ID Creation Success!", // + JSON.stringify(this.user), FOR DEBUG
                    type: 'success'
                });
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                }, 1000);
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.openFullScreen(); // loading Screen
                        this.addAccount(); // input credential into Json
                        this.$router.push("/login"); // to Login

                    } else {
                        console.log('Invalid form');
                        return false;
                    }
                });
            },
            async addAccount() {
                const userCount = this.credentials.length;
                const ratings = [];
                const res = await axios.post(baseURL_user, { id: userCount+1, email: this.signupForm.email, password: this.signupForm.password, ratings: ratings });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .signup {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:3%;
    }
    .signup-button, .reset-button {
        width: 100%;
        margin-top: 1%;
    }
    .signup-card {
        display: flex;
        justify-content: center;
        width: 340px;
        padding-top : 1%;
        padding-bottom : 1%;
    }
    .signupForm {
        width: 300px;
    }
    h2 {
        color: black;
        letter-spacing: 1px;
        padding-bottom: 20px;
    }
    .signup .el-input input {
        padding-left: 35px;
    }
</style>