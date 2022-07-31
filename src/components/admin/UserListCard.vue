<template>
  <div class="card-wrapper">
    <img
      class="card-wrapper__background-img"
      src="https://picsum.photos/200/300"
    />
    <img
      class="card-wrapper__avatar"
      :src="user.avatar || images.defaultAvatar"
    />
    <div class="card-wrapper__content">
      <p class="card-wrapper__content__name">{{ user.name }}</p>
      <p class="card-wrapper__content__account">{{ '@' + user.account }}</p>
      <div class="card-wrapper__content__tweets-likes">
        <div class="card-wrapper__content__tweets-likes__content">
          <img :src="images.replyLogo" />
          <p>{{ user.TweetsCount }}</p>
        </div>
        <div class="card-wrapper__content__tweets-likes__content">
          <img :src="images.likeLogo" />
          <p>{{ user.LikesCount }}</p>
        </div>
      </div>
      <div class="card-wrapper__content__followers">
        <div class="card-wrapper__content__followers__content">
          <p class="card-wrapper__content__followers__content__count">
            {{ user.FollowingCount + ' 個' }}
          </p>
          <p>跟隨中</p>
        </div>
        <div class="card-wrapper__content__followers__content">
          <p class="card-wrapper__content__followers__content__count">
            {{ user.FollowerCount + ' 個' }}
          </p>
          <p>跟隨者</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '../../assets/logo-gray.png';
import replyLogo from '../../assets/reply.png';
import likeLogo from '../../assets/like.png';
export default {
  name: 'UserListCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      images: {
        defaultAvatar: defaultAvatar,
        replyLogo: replyLogo,
        likeLogo: likeLogo,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  width: 249px;
  height: 315px;
  border-radius: 10px;
  background-color: $card-gray;

  &__background-img {
    border-radius: 10px 10px 0 0;
    height: 140px;
    object-fit: cover;
  }

  &__avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid $white;

    position: absolute;
    top: 64px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
  }

  &__content {
    padding-top: 32px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    &__name {
      @extend %primary-p;
      font-weight: 700;
      line-height: 26px;
    }

    &__account {
      @extend %secondary-p;
      color: $secondary-gray;
      line-height: 22px;
    }

    &__tweets-likes {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      column-gap: 18px;
      padding-top: 20px;

      &__content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        > p {
          @extend %primary-p;
          padding-left: 10px;
          font-weight: 500;
        }
      }
    }
    &__followers {
      padding-top: 12px;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      column-gap: 8px;

      &__content {
        display: flex;
        color: $secondary-gray;

        &__count {
          color: $main-black;
        }
      }
    }
  }
}
</style>
