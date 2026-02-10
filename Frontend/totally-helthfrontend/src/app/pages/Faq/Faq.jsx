"use client";
import Image from "next/image";
import { useState } from "react";

import React from "react";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "Eget justo aliquam vel rhoncus tortor suscipit. Etiam dis integer. Bibendum inceptos curae. Cras feugiat proin est vestibulum integer tincidunt dapibus quisque Urna. Nibh quisque per tellus dis fringilla fringilla habitasse posuere aliquam quam ornare nibh odio commodo Curabitur. Nectus etiam. Aptent. Libero morbi. Libero nam torquent rhoncus fames eu consequat pulvinar. Fermentum, urna torquent fermentum. Nulla lacus scelerisque penatibus sodales dictum quisque. Est urna vel commodo cubilia pede ipsum etiam. Et ac quis leo bibendum platea Mus nascetur. Potenti eleifend iaculis cras. Consequat erat suscipit Nullam parturient mauris sollicitudin. A massa ad imperdiet neque platea nonummy senectus.",
  },
  {
    question: "How can I contact your support team?",
    answer:
      "Eget justo aliquam vel rhoncus tortor suscipit. Etiam dis integer. Bibendum inceptos curae. Cras feugiat proin est vestibulum integer tincidunt dapibus quisque Urna. Nibh quisque per tellus dis fringilla fringilla habitasse posuere aliquam quam ornare nibh odio commodo Curabitur. Nectus etiam. Aptent. Libero morbi. Libero nam torquent rhoncus fames eu consequat pulvinar. Fermentum, urna torquent fermentum. Nulla lacus scelerisque penatibus sodales dictum quisque. Est urna vel commodo cubilia pede ipsum etiam. Et ac quis leo bibendum platea Mus nascetur. Potenti eleifend iaculis cras. Consequat erat suscipit Nullam parturient mauris sollicitudin. A massa ad imperdiet neque platea nonummy senectus.",
  },
  {
    question: "What are Totally Health Meal Plans?",
    answer:
      "Eget justo aliquam vel rhoncus tortor suscipit. Etiam dis integer. Bibendum inceptos curae. Cras feugiat proin est vestibulum integer tincidunt dapibus quisque Urna. Nibh quisque per tellus dis fringilla fringilla habitasse posuere aliquam quam ornare nibh odio commodo Curabitur. Nectus etiam. Aptent. Libero morbi. Libero nam torquent rhoncus fames eu consequat pulvinar. Fermentum, urna torquent fermentum. Nulla lacus scelerisque penatibus sodales dictum quisque. Est urna vel commodo cubilia pede ipsum etiam. Et ac quis leo bibendum platea Mus nascetur. Potenti eleifend iaculis cras. Consequat erat suscipit Nullam parturient mauris sollicitudin. A massa ad imperdiet neque platea nonummy senectus.",
  },
  {
    question: "How do I know Totally Health Meal Plans really work?",
    answer:
      "Eget justo aliquam vel rhoncus tortor suscipit. Etiam dis integer. Bibendum inceptos curae. Cras feugiat proin est vestibulum integer tincidunt dapibus quisque Urna. Nibh quisque per tellus dis fringilla fringilla habitasse posuere aliquam quam ornare nibh odio commodo Curabitur. Nectus etiam. Aptent. Libero morbi. Libero nam torquent rhoncus fames eu consequat pulvinar. Fermentum, urna torquent fermentum. Nulla lacus scelerisque penatibus sodales dictum quisque. Est urna vel commodo cubilia pede ipsum etiam. Et ac quis leo bibendum platea Mus nascetur. Potenti eleifend iaculis cras. Consequat erat suscipit Nullam parturient mauris sollicitudin. A massa ad imperdiet neque platea nonummy senectus.",
  },
];
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <>
      <section
        className="py-16"
        style={{
          backgroundImage: "url('/img/pricing/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-6xl mx-auto  px-4">
          <h3 className="text-2xl font-medium mb-4">
            Frequently Asked Questions
          </h3>
          <p className=" font-medium text-sm">
            Here, you can find out everything you need to know about Totally
            HealthyMeal Plans. If you have any other questions, you can contact
            us here or call 800-39872.
          </p>
        </div>
      </section>
      <section className="bg-[#f8f5f0] py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid  md:grid-cols-[1fr_2fr] grid-cols-1 gap-12">
            <div className="bg-white shadow-sm p-3">
              <Image src="/img/faq.jpg" alt="faq" width={500} height={500} />
            </div>
            <div className="">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200  bg-white shadow-xs"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-4  tracking-wider font-bold text-sm cursor-pointer text-gray-800 hover:text-[#aa8453] transition flex justify-between items-center"
                    >
                      {faq.question}
                      <span className="ml-2 text-xl">
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>

                    {openIndex === index && (
                      <div className="px-4 pb-4 text-xs leading-loose  text-gray-500 tracking-widest">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
