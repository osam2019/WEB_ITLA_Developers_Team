<template>
    <div id="app">
        <div class="header">
            <h1 class="sitename" @click="$router.push('/home')" style="cursor: pointer">
                <i class="el-icon-info"></i>
                ITLA.com
            </h1>
            <p v-if="loginCheck"> Greetings, {{getLoginedEmail}}! </p>
            <p v-else> Please Login first. </p>
        </div>
        <div id="nav">
            <el-menu
                    class="main-menu"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="1"> <router-link to="/home" style="text-decoration: none">Home</router-link> </el-menu-item>
                <el-menu-item index="2" v-if="loginCheck"> <a style="text-decoration: none" @click.stop="logout" >Logout</a> </el-menu-item>
                <el-menu-item index="2" v-else> <router-link to="/login" style="text-decoration: none">Login</router-link> </el-menu-item>
                <el-menu-item index="3" disabled> Setting </el-menu-item>
<!--                <router-link to="/setting" style="text-decoration: none">Setting</router-link>-->
                <el-menu-item index="4"> <router-link to="/about" style="text-decoration:none">About</router-link> </el-menu-item>
            </el-menu>
        </div>
        <router-view></router-view>
        <div class="footer">
            <div class="About">
                <span> <a href="https://www.ele.me" target="_blank" style="text-decoration:none">Based on Element UI</a> </span>
                <div class="version">Version 0.2</div>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapState } from 'vuex';
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: "App",

        computed: {
            ...mapState([
                'loginedID', 'loginedEmail', 'feedCategories'
            ]),
            ...mapGetters([
                'getLoginedID', 'getLoginedEmail'
            ]),
            loginCheck() {
                return this.$store.getters.getLoginedID != null;
            }
        },
        methods: {
            ...mapMutations([
                'LOGIN', 'LOGOUT'
            ]),
            ...mapActions([

            ]),
            handleSelect(key, keyPath) {
                console.log(key, keyPath); // Debug
            },
            logout() {
                // LOGOUT 변이 실행
                this.$store.commit('LOGOUT');
                //this.$store.dispatch('LOGOUT');
            }
        }
    }
</script>

<style>
    #app {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif; /* element ui style font */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav {
        padding: 1%;
    }

    #nav a {
        display:block;
        width:100%;
        height:100%;
    }

    .main-menu li {
        width:25%;
        font-size:20px;
    }

    body {
        margin: 0;
        padding: 0;
        background: #3b4e61; /* #102a43 */
        background-size: contain;
    }

    .header, .footer {
        padding: 20px;
        color: #f0f4f8;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1,
    h2,
    h3 {
        color: #f0f4f8;
        padding: 0;
        margin: 0;
    }

    .sitename {
        letter-spacing: 3px;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .About {
        display: flex;
    }

    .About span {
        padding: 0 10px;
        font-size: 18px;
        border-right: 1px solid #9fb3c8;
    }

    .About span:last-child {
        border-right: none;
    }

    .About span a {
        color: #f0f4f8;
        display:block;
        width:100%;
        height:100%
    }

    .version {
        padding: 0 10px;
        color: #f0f4f8;
        font-size: 13px;
        margin-top: 5px;
    }


</style>
