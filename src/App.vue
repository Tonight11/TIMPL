<script setup>
  import LogoIcon from "@/components/icon/LogoIcon.vue";
  import GreenTextIcon from "@/components/icon/GreenTextIcon.vue";
  import { useHeroStore } from "@/store/hero";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";

  const store = useHeroStore();
  const { hero } = storeToRefs(store);

  const { initialRating = 0 } = defineProps({ initialRating: Number });

  const selectedRating = ref(initialRating);
  const saveRating = ref(0);
  const isHovered = ref(0);
  const isBtnActive = ref(false);

  const hoverRating = (rating) => {
    selectedRating.value = 0;
    isHovered.value = rating;
  };
  const leaveRating = () => {
    isHovered.value = 0;
    selectedRating.value = saveRating.value;
  };

  const rateService = (rating) => {
    selectedRating.value = rating;
    saveRating.value = selectedRating.value;
    hero.value.rating = selectedRating.value;
  };

  const updateEnjoy = (key) => {
    hero.value.enjoy[key] = !hero.value.enjoy[key];
  };

  function createWave(button) {
    const btn = button.target;
    let ripple = document.createElement("span");

    // Add ripple class to span
    ripple.classList.add("ripple");

    // Add span to the button
    btn.appendChild(ripple);

    // Position the span element
    ripple.style.left = `0px`;
    ripple.style.top = `0px`;

    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 1000);

    // store.pay();
  }
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <header class="header">
        <img
          class="header__shadow"
          src="@/assets/img/shadow.png"
          alt="shadow"
        />
        <div class="header__img">
          <img class="header__img_main" :src="hero.img" alt="" />
        </div>
        <div class="logo">
          <LogoIcon />
        </div>
        <div class="logo__circle">
          <img src="@/assets/img/logo.png" alt="" />
          <img src="@/assets/img/Clayton-Hotel.png" alt="" />
        </div>
        <div class="header__body">
          <div class="header__rect">
            <div class="header__rect_front">
              <div class="logo__rect"></div>
              <!--               
              <img src="@/assets/img/rect2.png" alt="" /> -->
              <div class="header__name">{{ hero.name }}</div>
              <div class="header__name header__who">{{ hero.text }}</div>
              <GreenTextIcon />
            </div>

            <img class="header__rect_back" src="@/assets/img/rect.png" alt="" />
          </div>
        </div>
      </header>

      <main class="content">
        <div class="tip dotted">
          <div class="tip__title title">Glad you enjoyed it today</div>
          <div class="tip__text text">
            Choose the amount you wish to tip and we will transfer it directly
          </div>
          <input
            v-model="hero.tip"
            placeholder="Tip amount"
            class="tip__amount"
          />
          <div class="tip__items">
            <div
              v-for="item in hero.tipAmount"
              :key="item"
              class="tip__item"
              @click="hero.tip = item"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="rate dotted">
          <div class="rate__title title">Rate your experience</div>
          <div class="rate__stars">
            <div
              v-for="index in 5"
              :key="index"
              @mouseover="hoverRating(index)"
              @mouseleave="leaveRating"
              @click="rateService(index)"
            >
              <svg
                class="star"
                :class="{
                  hovered: index <= isHovered,
                  filled: index <= selectedRating,
                }"
                width="42"
                height="40"
                viewBox="0 0 42 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3098 2.45096C19.4102 0.221224 22.5898 0.221219 23.6902 2.45096L27.6493 10.473C28.0863 11.3584 28.931 11.9721 29.9081 12.1141L38.7609 13.4005C41.2216 13.758 42.2041 16.7819 40.4236 18.5176L34.0176 24.7618C33.3106 25.451 32.9879 26.444 33.1548 27.4172L34.6671 36.2342C35.0874 38.685 32.5151 40.5538 30.3142 39.3968L22.396 35.2339C21.5221 34.7745 20.4779 34.7745 19.604 35.2339L11.6858 39.3968C9.48491 40.5538 6.91261 38.685 7.33294 36.2342L8.84518 27.4172C9.01209 26.444 8.68945 25.451 7.98239 24.7618L1.57644 18.5176C-0.204112 16.7819 0.778414 13.758 3.23908 13.4005L12.0919 12.1141C13.069 11.9721 13.9137 11.3584 14.3507 10.473L18.3098 2.45096Z"
                  fill="#EEE9FC"
                />
              </svg>
            </div>
          </div>
          <div v-if="hero.rating" class="rate__add">
            <div class="rate__text">What did you enjoy the most?</div>
            <div class="rate__choose blue-back">
              <div
                v-for="(item, key) in hero.enjoy"
                :key="item"
                class="rate__check checkbox-group"
              >
                <input
                  :id="key"
                  type="checkbox"
                  :checked="item"
                  @input="updateEnjoy(key)"
                />
                <label class="pay__text" :for="key">
                  <span> {{ key }}</span></label
                >
              </div>
            </div>
            <input
              v-model="hero.review"
              class="rate__choose blue-back rate__choose__text"
              type="text"
            />
          </div>
        </div>
        <div class="pay dotted">
          <div class="pay__argeement radio-group">
            <div class="pay__info">
              <div class="pay__text text">
                I want Philip to get the full amount
              </div>
              <div class="pay__subtext">
                You compensate service commission, and
                {{
                  hero.fullTip ? +hero.tip.slice(0, -1) * 1.1 + "€" : hero.tip
                }}
                will be debited from your card.
              </div>
            </div>
            <div class="pay__radio">
              <input id="switch" v-model="hero.fullTip" type="checkbox" />
              <label for="switch">Toggle</label>
            </div>
          </div>
          <button class="pay__btn btn btn-primary" @click="store.pay">
            <img src="@/assets/img/apple.svg" alt="" />
          </button>
          <button
            :disabled="!isBtnActive"
            class="pay__btn btn btn-secondary"
            @click="createWave"
          >
            Pay by card
          </button>

          <div class="pay__agree checkbox-group">
            <input id="agree" v-model="isBtnActive" type="checkbox" />
            <label class="pay__text" for="agree">
              <span>
                I agree with <u> Terms & Conditions</u> and
                <u> Privacy policy</u>
              </span>
            </label>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
  .header {
    position: relative;
    margin-bottom: 15px;
  }
  .header__shadow {
    position: absolute;
    bottom: -18%;
    left: 0;
    right: 0;
  }
  .header__body {
    position: absolute;
    bottom: 35%;
    left: 0;
  }

  .header__img {
    position: relative;
    z-index: 2;
    overflow: hidden;
    height: 397px;

    border-radius: 28px;
    overflow: hidden;
  }
  .header__name {
    position: absolute;
    color: white;
    top: 40%;
    left: 28%;
    transform: translateY(-40%) rotate(5.27deg);

    font-size: 24px;
  }
  .header__who {
    top: 67%;

    font-size: 13px;
  }
  .header__rect {
  }
  .header__rect_front {
    z-index: 20;

    display: block;
    width: 289px;
    height: 88px;
    background-color: #8e6cea;
    transform: rotate(-5.27deg);
    position: relative;
    top: 100px;
    left: -50px;
    border-radius: 8px;

    overflow: hidden;
  }
  .header__rect_back {
    position: absolute;
    left: -10px;
    bottom: -130px;
    z-index: 1;
  }

  .logo {
    position: absolute;
    bottom: -20px;
    right: 0;
    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo__rect {
  }

  .logo__circle {
    position: absolute;
    bottom: 0;
    z-index: 100;
    right: 20px;
    width: 120px;
    height: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: #fff;
    filter: drop-shadow(0px 16px 20px rgba(0, 0, 0, 0.2));
  }

  .logo__circle img {
    position: absolute;
  }
  .logo__circle img:first-child {
    top: 13%;
  }
  .logo__circle img:last-child {
    top: 62%;
  }

  .logo__text {
    animation: rotateAnimation 10s linear infinite;
  }
  .logo__text-green {
    position: absolute;
    top: 0%;
    right: -39%;
  }
  .logo__text path {
    mix-blend-mode: difference;
  }

  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .dotted {
    position: relative;
    z-index: 11;

    background-color: white;
    border-radius: 28px;
    padding: 24px;

    overflow: hidden;
  }
  .dotted:not(:last-child)::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20;
    top: calc(100% - 3px);
    left: 40px;
    width: 100%;

    background-image: url("@/assets/img/dotted.png");
    background-repeat: no-repeat;
    pointer-events: none;
  }
  .dotted:not(:first-child)::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20;
    top: -2px;
    left: 40px;
    width: 100%;
    background-image: url("@/assets/img/dotted.png");
    background-repeat: no-repeat;
    pointer-events: none;
  }
  .dotted:first-child {
    padding-top: 48px;
    border-radius: 28px;
  }
  .pay {
  }
  .pay__argeement {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
  }
  .pay__info {
  }

  .pay__btn {
    margin-bottom: 13px;
  }
  .pay__btn.btn-secondary {
    margin-bottom: 30px;
  }
  .pay__radio {
    flex: 1;
  }

  .pay__title {
  }
  .rate {
  }
  .rate__text {
    font-size: 13px;
    color: #8e6cea;
    margin-bottom: 18px;
    padding-top: 18px;
    text-align: center;
  }
  .rate__title {
  }
  .rate__stars {
    display: flex;
    justify-content: space-between;
  }
  .rate__choose {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .rate__choose__text {
    padding-top: 6px;
    padding-bottom: 6px;
    color: #808191;
    font-size: 13px;
  }

  .rate__check {
    position: relative;
  }
  .rate__check::before {
    content: "";
    display: block;
    width: 85%;
    height: 1px;
    background: #dde3f1;
    position: absolute;
    bottom: -6px;
    left: 14%;
  }
  .rate__check:last-child::before {
    content: none;
  }
  .rate__check label {
    font-size: 14px;
    font-weight: 600;
  }
  .rate__check .pay__text {
    padding-left: 38px;
    margin: 0;
  }
  .rate__check .pay__text::after {
    top: 8px;
    left: 6.5px;
  }
  .rate__check span {
    color: #151515;
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
  }
  .star {
  }
  .tip {
  }
  .tip__amount {
    border: 2px #ba79fe solid;
    border-radius: 15px;

    font-size: 20px;
    color: #ba79fe;
    text-align: center;

    padding: 14px 0;
    margin-bottom: 10px;
  }
  .tip__amount::placeholder {
    font-size: 20px;
    color: #ba79fe;
    text-align: center;
    font-weight: 600;
  }
  .tip__item {
    flex: 1;

    text-align: center;
    font-size: 24px;
    font-weight: 600;

    padding: 9px 0;
    border-radius: 20px;

    background-color: rgba(186, 121, 254, 0.15);

    cursor: pointer;
  }
  .tip__items {
    display: flex;
    justify-content: space-between;
    gap: 13px;
  }
  .tip__text {
    text-align: center;
    font-size: 13px;
    font-weight: 600;
  }
  .tip__title {
  }
  .title {
    font-size: 21px;
    color: white;
    text-align: center;
    background-color: #8e6cea;
    border-radius: 8px;
    padding: 9px 0;
    margin-bottom: 15px;

    color: #c6fca1;
    font-weight: 600;
  }

  .text {
    font-size: 13px;
    text-align: center;
    margin-bottom: 14px;
  }

  .pay__text {
    text-align: left;
    margin-bottom: 5px;
  }
  .pay__subtext {
    font-size: 11px;
  }
  .star {
    transition: fill 0.3s;
    cursor: pointer;
  }

  .star.filled path {
    fill: #ffd80d;
  }
  .star.hovered path {
    fill: #ffd80d;
  }
</style>
