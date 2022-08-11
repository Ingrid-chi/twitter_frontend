<template>
  <div class="modal-bg">
    <form
      class="modal-container"
      @submit.stop.prevent="save"
      enctype="multipart/form-data"
    >
      <div class="modal-header">
        <img
          :src="deleteOrange"
          :alt="deleteOrange.title"
          @click="hideModal(false)"
        />
        <div class="title">編輯個人資料</div>
        <button class="save-btn" type="submit">儲存</button>
      </div>
      <div class="modal-main">
        <img :src="cover" alt="" class="cover" />
        <input
          type="file"
          @change="changeCover"
          id="imgUpload"
          style="display: none"
          name="cover"
        />
        <label for="imgUpload">
          <img :src="camera" class="camera" />
          <img :src="plus" alt="" class="plus" />
        </label>
        <img :src="deleteWhite" alt="" class="delete-white" />
        <div class="avator-wrapper">
          <img class="avator" :src="avatar" alt="userImg" />
          <input
            type="file"
            @change="changeAvatar"
            id="avatarUpload"
            style="display: none"
            name="avatar"
          />
          <label for="avatarUpload">
            <img :src="camera" alt="" class="avator-camera" />
            <img :src="plus" alt="" class="avator-plus" />
          </label>
        </div>
        <div class="modal-main-form">
          <div class="modal-main-name">
            <label for="name">名稱</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              placeholder=""
            />
          </div>
          <p class="counter">{{ name?.length ?? "0" }}/50</p>

          <div class="modal-main-description">
            <label for="">自我介紹</label
            ><textarea
              class=""
              name="introduction"
              id=""
              cols="30"
              rows="3"
              wrap="hard"
              maxlength="160"
              placeholder=""
              v-model="introduction"
            ></textarea>
          </div>

          <p class="counter">{{ introduction?.length ?? "0" }}/160</p>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { commonItems } from "../configs/commonConfigs";
import { mapState, mapMutations } from "vuex";
import userApis from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "EditModal",
  data() {
    return {
      delete: commonItems.deleteOrange,
      name: "",
      introduction: "",
      avatar: "",
      cover: "",
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    deleteOrange() {
      return require(`../assets/${this.delete.image}`);
    },
    deleteWhite() {
      return require(`../assets/${commonItems.deleteWhite.image}`);
    },
    camera() {
      return require(`../assets/${commonItems.camera.image}`);
    },
    plus() {
      return require(`../assets/${commonItems.plus.image}`);
    },
  },
  watch: {
    currentUser() {
      this.name = this.currentUser.name;
      this.introduction = this.currentUser.introduction;
      this.avatar = this.currentUser.avatar;
      this.cover = this.currentUser.cover;
    },
    name() {
      if (this.name.length >= 50) {
        Toast.fire({
          icon: "error",
          title: "字數上限為50字",
        });
        this.name = "";
        return;
      }
    },
    description() {
      if (this.description.length >= 50) {
        Toast.fire({
          icon: "error",
          title: "字數上限為50字",
        });
        this.description = "";
        return;
      }
    },
  },
  methods: {
    ...mapMutations(["createTweet", "setTweets", "setCurrentUser"]),

    hideModal(isEdit) {
      this.$emit("hide-modal", isEdit);
    },

    async save(e) {
      const form = e.target;
      const formData = new FormData(form);
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
      const response = await userApis.editUserSettings({
        id: this.currentUser.id,
        formData,
      });
      // this.setCurrentUser({
      //   ...response.data,
      // 後端回傳資料沒變，用下面兩個蓋掉
      //   avatar: this.avatar,
      //   cover: this.cover,
      // })
      this.setCurrentUser(response.data);
      console.log(response.data);
      this.hideModal(true);
    },

    changeCover(e) {
      const files = e.target.files;
      const coverURL = window.URL.createObjectURL(files[0]);
      this.cover = coverURL;
    },

    changeAvatar(e) {
      const files = e.target.files;
      console.log(files[0].size);
      const avatarURL = window.URL.createObjectURL(files[0]);
      this.avatar = avatarURL;
      // const _this = this;
      // const reader = new FileReader();
      // reader.readAsDataURL(files[0]);
      // reader.onloadend = function () {
      //   const base64data = reader.result;
      //   _this.avatar = base64data;
      // };
    },
  },
};
</script>
<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal-container {
  height: 634px;
  min-width: 610px;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  position: fixed;
  top: 10vh;
  left: 21vw;
}
.modal-header {
  height: 56px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-bottom: 1px solid $line-gray;
  img {
    @include size(15px, 15px);
    margin-left: 19.5px;
    // position: absolute;
    // top: 20.5px;
    // left: 19.5px;
  }
  .title {
    @include font(26px, 700, 18px);
    margin-left: 36.5px;
  }
  .save-btn {
    @extend %modal-btn;
    position: absolute;
    top: 8px;
    right: 16px;
  }
}
.modal-main {
  @include size(100%, 243px);
  position: relative;

  .avator {
    position: relative;
    border: 4px solid white;
    border-radius: 50%;
    background-clip: content-box;
    object-fit: cover;
    opacity: 0.5;
    &-wrapper {
      position: absolute;
      top: 124px;
      left: 16.13px;
      border-radius: 50%;
      background-color: #171725;

      @include size(141.1px, 140px);
    }
    &-camera {
      position: absolute;
      top: 60px;
      left: 59.87px;
      @include size(20px, 20px);
    }
    &-plus {
      position: absolute;
      top: 66.17px;
      left: 65.01px;
      @include size(9.72px, 9.72px);
    }
  }
  .cover {
    @include size(100%, 200px);
    object-fit: cover;
    opacity: 0.75;
  }
  .camera {
    position: absolute;
    top: 90px;
    left: 279px;
    @include size(20px, 20px);
  }
  .delete-white {
    position: absolute;
    top: 92.5px;
    right: 286.5px;
    @include size(15px, 15px);
  }
  .plus {
    position: absolute;
    top: 96.17px;
    left: 284.14px;
    @include size(9.72px, 9.72px);
  }
  &-form {
    padding: 80px 16px 8px 16px;
  }
  &-name {
    height: 54px;
    background-color: #f5f8fa;
    border-radius: 2px;
    border-bottom: 2px solid $primary-gray;
    padding: 2px 10.55px;

    label {
      @extend %secondary-p;
      height: 22px;
      display: block;
      text-align: left;
      line-height: 22px;
      font-weight: 400;
      color: #696974;
    }

    input {
      @extend %primary-p;
      height: 26px;
      width: 100%;
      display: block;
      border: none;
      background-color: #f5f8fa;
      line-height: 26px;
      font-weight: 400;
      color: #b5b5be;
    }
  }
  &-description {
    border-bottom: 2px solid $primary-gray;
    border-radius: 2px;
    padding: 2px 10.55px;
    background-color: #f5f8fa;

    @include font(26px, 700, 18px);
    color: $secondary-gray;
    label {
      @extend %secondary-p;
      height: 22px;
      display: block;
      text-align: left;
      line-height: 22px;
      font-weight: 400;
      color: #696974;
    }
    textarea {
      width: 100%;
      min-height: 147px;
      border: none;
      resize: none;
      outline: none;
      display: inline-block;
      background-color: #f5f8fa;
    }
  }
  .counter {
    margin-top: 4px;
    margin-bottom: 8px;
    text-align: end;
    @include font(20px, 500, 12px);
    color: #696974;
  }
}
</style>