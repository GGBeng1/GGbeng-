<template>
    <div class="admin">
        <div class="header">
            <p class="title">GGbeng-UI</p>
            <p class='text1'>基于vue.js的多端高质量UI组件</p>
            <p class='text1'>~任何平凡的梦想，经过努力都会发出自己喜欢的光芒~</p>
            <div class="list">
                <a href="https://ggbeng1.github.io/GGbengUI/">指南</a>
                <a href="https://ggbeng1.github.io/GGbengUI/baseComponents/">组件</a>
                <a href="https://ggbeng1.github.io/GGbengUI/baseComponents/base/updata.html">更新日志</a>
                <a href="https://github.com/GGBeng1/GGbengUI">GitHub</a>
                <a href="#" @click='showLogin'>bug提交</a>
            </div>
        </div>
        <div class="content" id='contents'>
            <ball></ball>
        </div>
        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
            <mu-appbar color="primary" title="GGbeng-UI BUG提交">
                <mu-button slot="left" icon @click="closeFullscreenDialog">
                    <mu-icon value="close"></mu-icon>
                </mu-button>
                <mu-button slot="right" flat @click="closeFullscreenDialog">
                    Done
                </mu-button>
            </mu-appbar>
            <div style="padding: 24px;padding-top: 120px">
                <mu-container>
                    <mu-card style="width: 100%; max-width: 750px; margin: 0 auto;">
                        <mu-card-header title="GGbeng" sub-title="cmz">
                            <mu-avatar slot="avatar">
                                G
                            </mu-avatar>
                        </mu-card-header>
                        <mu-card-title title="感谢您选择GGbeng-ui" sub-title="愿您开发一切顺利➡_➡"></mu-card-title>
                        <mu-card-text>
                            ggbeng-ui刚刚起步，有许多不完善的地方，希望开发者多多提出宝贵的意见。
                            <br />
                            ggbeng-ui近期会有大动作，pc端和移动端的分离，小程序端的开发，更多的组件。
                            <br />
                            自始至终，ggbeng-UI的开发都是我一个人，难免有些纰漏，希望开发者面对BUG不要紧张，只需提交即可，我会在最快的时间内回复。
                            <br />
                            <span style='color:orangered'>提交规范：</span>
                            <br />
                            <span style='color:orangered'>bug场景+组件名+相应部分源码/或者上传<span style='color: #000;'>.zip</span>文件不大于<span style='color: #000;'>800kb</span>！</span>
                            <br />
                            <span style='color:orangered'>上传文件务必压缩为<span style='color: #000;'>.zip</span>的文件，将场景及报错截图，源码放入即可</span>
                        </mu-card-text>
                        <mu-card-actions>
                            <!-- <mu-button flat>Action 1</mu-button> -->
                            <!-- <mu-button flat>Action 2</mu-button> -->
                        </mu-card-actions>
                    </mu-card>
                </mu-container>
                <beautiful-chat 
                :participants="participants" 
                :titleImageUrl="titleImageUrl" 
                :onMessageWasSent="onMessageWasSent" 
                :messageList="messageList" 
                :newMessagesCount="newMessagesCount" 
                :isOpen="isChatOpen" 
                :close="closeChat" 
                :open="openChat" 
                :showEmoji="true" 
                :showFile="true" 
                :showTypingIndicator="showTypingIndicator" 
                :colors="colors" 
                :alwaysScrollToBottom="alwaysScrollToBottom" 
                :messageStyling="messageStyling" 
                :placeholder='placeholder'/>
            </div>
        </mu-dialog>
    </div>
</template>
<script>
import ball from "../components/tools/threeball.vue"
export default {
    components: {
        ball
    },
    data() {
        return {
            placeholder:'写点啥，老铁',
            connected: false,
            openFullscreen: false,
            participants: [{
                    id: 'user1',
                    name: 'GGbeng',
                    imageUrl: 'https://www.ggbeng.xyz/g.png'
                },
                {
                    id: 'me',
                    name: 'You',
                    imageUrl: 'https://www.ggbeng.xyz/you.png'
                }
            ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
            titleImageUrl: 'https://www.ggbeng.xyz/ggbeng.png',
            messageList: [
                // { type: 'text', author: `me`, data: { text: `Say yes!` } },

            ], // the list of the messages to show, can be paginated and adjusted dynamically
            newMessagesCount: 0,
            isChatOpen: false, // to determine whether the chat window should be open or closed
            showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
            colors: {
                header: {
                    bg: '#4e8cff',
                    text: '#ffffff'
                },
                launcher: {
                    bg: '#4e8cff'
                },
                messageList: {
                    bg: '#ffffff'
                },
                sentMessage: {
                    bg: '#4e8cff',
                    text: '#ffffff'
                },
                receivedMessage: {
                    bg: '#eaeaea',
                    text: '#222222'
                },
                userInput: {
                    bg: '#f4f7f9',
                    text: '#565867'
                }
            }, // specifies the color scheme for the component
            alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
            messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
            msg: {}
        }
    },
    methods: {
        showLogin() {
            this.openFullscreen = true
        },
        closeFullscreenDialog() {
            this.openFullscreen = false;
        },
        sendMessage(data) {
            // console.log(data)
            this.showTypingIndicator = ''
            if (data.text) {
                // console.log(123) 
                this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
                this.onMessageWasSent({ author: 'user1', type: 'text', data: data }, true)
            } else if (data.emoji) {
                // console.log(data)
                this.onMessageWasSent({
                    author: 'user1',
                    type: "emoji",
                    data: data
                }, true)
            } else if (data.file) {

                let s = this.toBuffer(data.file);
                // console.log(s)
            }

        },
        onMessageWasSent(message, isSend) {
            // called when the user sends a message
            // console.log(message)
            // message.author = "user2"
            if (!isSend) {
                // console.log(message)
                this.$socket.emit('messages', message)
                this.messageList = [...this.messageList, message]
            } else if (isSend) {
                this.messageList = [...this.messageList, message]
            }
            // console.log(this.messageList)
        },
        load(message) {
            this.$socket.emit('messages', message)
        },
        toBuffer(ab) {
            let buf = new Buffer(ab.byteLength);
            let view = new Uint8Array(ab);
            for (let i = 0; i < buf.length; ++i) {
                buf[i] = view[i];
            }
            return buf;
        },
        openChat() {
            // called when the user clicks on the fab button to open the chat
            this.isChatOpen = true
            this.newMessagesCount = 0
        },
        closeChat() {
            // called when the user clicks on the botton to close the chat
            this.isChatOpen = false
        }
    },
    sockets: {
        connect: function() {
            console.log('socket connected')
            this.connected = true;
        },
        messages: function(data) {
            this.sendMessage(data)
        },

    },
    mounted() {
        this.showTypingIndicator= '1';
        let contents = document.getElementById('contents');
        contents.style.height = window.innerHeight + "px";
        setTimeout(() => {
            let obj = {
                type: 'load',
                author: 'me',
                data: {
                    text: `hi,请提交符合规范的bug内容`
                }
            }
            this.load(obj)
        }, 3000)
    },
    created() {
        this.$on("zip",()=>{
            console.log('zip')
        })
    },
    watch: {
        isChatOpen(val) {
            if (val) {
                this.showTypingIndicator= '1';
                setTimeout(() => {
                    let obj = {
                        type: 'load',
                        author: 'me',
                        data: {
                            text: `hi,当你看见此条内容说明我不在线,请务必提交后留下邮箱.`
                        }
                    }
                    this.load(obj)
                },1500)
            }
        }
    }
}
</script>
<style lang='scss'>
.admin {
    box-sizing: border-box;
    height: 100%;
    background-color: #13194B;
    position: relative;
    overflow: hidden;

    .header {
        position: absolute;
        width: 100%;
        padding-top: 170px;

        .title {
            color: #fff;
            text-align: center;
            font-size: 35px;
        }

        .text1 {
            color: #fff;
            font-weight: 400;
            margin-top: 50px;
            font-size: 16px;
            text-align: center;
        }

        .list {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;

            a {
                display: block;
                padding: 10px 10px;
                color: #2d8cf0;
                cursor: pointer;
                transition: color .2s ease;
                position: relative;
                text-decoration: none;
                outline: 0;
                margin-right: 5px;
            }

            a:hover {
                color: #fff;

                &::before {
                    opacity: 1;
                    transform: translateY(0px);
                }

                &::after {
                    opacity: 1;
                    transform: translateY(0px);
                }
            }

            a::before {
                position: absolute;
                top: 0;
                -webkit-transform: translateY(-10px);
                transform: translateY(-10px);
                left: 0;
                width: 100%;
                height: 2px;
                background: #fff;
                content: "";
                opacity: 0;
                transition: opacity .3s, -webkit-transform .3s;
                transition: opacity .3s, transform .3s;
                -webkit-transform: translateY(-10px);
                transform: translateY(-10px);
                box-sizing: border-box;
            }

            a::after {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: #fff;
                content: "";
                opacity: 0;
                transition: opacity .3s, -webkit-transform .3s;
                transition: opacity .3s, transform .3s;
                -webkit-transform: translateY(-10px);
                transform: translateY(10px);
                box-sizing: border-box;
            }
        }
    }

    .content {
        /* // box-sizing: border-box; */
        padding-top: 400px;
        width: 100%;
    }
}
</style>