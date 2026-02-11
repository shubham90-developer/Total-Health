import { configureStore } from "@reduxjs/toolkit";
import { homeBannerApi } from "./homeBanner/homeBannerApi";
import { goalApi } from "./goal/goalApi";
import { brandsApi } from "./brands/brandsApi";
import { mealPlanWorkApi } from "./mealPlanWork/mealPlanWorkApi";
import { counterApi } from "./counter/counterApi";
import { compareApi } from "./compare/compareApi";
import { whyChooseApi } from "./whyChoose/whyChooseApi";
import { introVideoApi } from "./introVideo/introVideoApi";
import { testimonialsApi } from "./testimonials/testimonialsApi";
import { privacyPolicyApi } from "./privacyPolicy/privacyPolicy";
import { termsConditionsApi } from "./termsConditions/termsConditionsApi";
import { faqApi } from "./faq/faqApi";
import { aboutApi } from "./about/aboutApi";

export const store = configureStore({
  reducer: {
    [homeBannerApi.reducerPath]: homeBannerApi.reducer,
    [goalApi.reducerPath]: goalApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [mealPlanWorkApi.reducerPath]: mealPlanWorkApi.reducer,
    [counterApi.reducerPath]: counterApi.reducer,
    [compareApi.reducerPath]: compareApi.reducer,
    [whyChooseApi.reducerPath]: whyChooseApi.reducer,
    [introVideoApi.reducerPath]: introVideoApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [privacyPolicyApi.reducerPath]: privacyPolicyApi.reducer,
    [termsConditionsApi.reducerPath]: termsConditionsApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      homeBannerApi.middleware,
      goalApi.middleware,
      brandsApi.middleware,
      mealPlanWorkApi.middleware,
      counterApi.middleware,
      compareApi.middleware,
      whyChooseApi.middleware,
      introVideoApi.middleware,
      testimonialsApi.middleware,
      privacyPolicyApi.middleware,
      termsConditionsApi.middleware,
      faqApi.middleware,
      aboutApi.middleware,
    ),
});
