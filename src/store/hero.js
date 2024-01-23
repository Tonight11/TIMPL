import { defineStore } from "pinia";
import { ref } from "vue";
import pfp from "@/assets/img/hero.png";
import logo from "@/assets/img/logo.png";

export const useHeroStore = defineStore("hero", () => {
  const hero = ref({
    img: pfp,
    name: "Gabrielle",
    text: "was your waiter",
    logo: logo,
    tip: "5€",
    tipAmount: ["2€", "5€", "10€"],
    rating: 0,
    fullTip: false,
    agreement: false,
    enjoy: {
      service: false,
      cleanliness: true,
      atmosphere: false,
      foodQuality: false,
    },
  });

  const pay = () => {
    alert(
      JSON.stringify({
        ...hero.value,
        tip: hero.value.fullTip
          ? +hero.value.tip.slice(0, -1) * 1.1 + "€"
          : hero.value.tip,
      }),
    );
  };

  return { hero, pay };
});
