<template>
    <div class='bug'>
        <mu-container>
            <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
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
                    <span style='color:orangered'>bug场景+组件名+相应部分源码/或者上传<span style='color: #000;'>.zip</span>文件不大于<span style='color: #000;'>800kb</span>!</span>
                    <br />
                    <span style='color:orangered'>上传文件务必压缩为<span style='color: #000;'>.zip</span>的文件，将场景及报错截图，源码放入即可</span>
                </mu-card-text>
                <mu-card-actions>
                    <!-- <mu-button flat>Action 1</mu-button> -->
                    <!-- <mu-button flat>Action 2</mu-button> -->
                </mu-card-actions>
            </mu-card>
        </mu-container>
        <beautiful-chat :participants="participants" :titleImageUrl="titleImageUrl" :onMessageWasSent="onMessageWasSent" :messageList="messageList" :newMessagesCount="newMessagesCount" :isOpen="isChatOpen" :close="closeChat" :open="openChat" :showEmoji="true" :showFile="true" :showTypingIndicator="showTypingIndicator" :colors="colors" :alwaysScrollToBottom="alwaysScrollToBottom" :messageStyling="messageStyling" :placeholder='placeholder'/>
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {
            placeholder:"老铁，写点啥",
            participants: [{
                    id: 'user1',
                    name: 'GGbeng',
                    imageUrl: 'https://www.ggbeng.xyz/g.png'
                },
                // {
                //  id: 'me',
                //  name: 'You',
                //  imageUrl: 'https://www.ggbeng.xyz/you.png'
                // }
            ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
            titleImageUrl: 'https://www.ggbeng.xyz/ggbeng.png',
            messageList: [
                // { type: 'text', author: `me`, data: { text: `Say yes!` } },
            ], // the list of the messages to show, can be paginated and adjusted dynamically
            newMessagesCount: 0,
            isChatOpen: false, // to determine whether the chat window should be open or closed
            showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
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
        load(message) {
            this.$socket.emit('messages', message)
        },
        sendMessage(data) {
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
                this.$socket.emit('messages', message)
                this.messageList = [...this.messageList, message]
            } else if (isSend) {
                this.messageList = [...this.messageList, message]
            }

            // console.log(this.messageList)

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
        },
        messages: function(data) {
            // console.log("~~~")
            this.sendMessage(data)
            // this.msg = data
            // console.log(data)
            // this.msg = data;
        }
    },
    mounted() {
        this.showTypingIndicator= '1';
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
                }, 1500)
            }
        }
    }
}
</script>
<style lang='scss'>
.bug {
    padding-top: 15px;

    .sc-user-input--buttons {
        right: 10px;
    }

}
</style>