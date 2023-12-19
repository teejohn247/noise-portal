import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import Faq from "./Faq";

const faqs = [
  {
    id: 1,
    question: "What does the Noise and Emission Control department focus on?",
    answer:
      "The Noise and Emission Control department is responsible for protecting residents from noise pollution and other emissions. This includes implementing measures to reduce noise levels and control harmful emissions from various sources.",
  },
  {
    id: 2,
    question:
      "How does the Water and Land Pollution Control department contribute to environmental preservation?",
    answer:
      "The Water and Land Pollution Control department works to preserve natural water resources and land by implementing strategies to prevent and control pollution. This includes monitoring water quality, regulating industrial discharges, and promoting sustainable land use practices.",
  },
  {
    id: 3,
    question:
      "What is the role of the Chemical and Hazardous Materials department?",
    answer:
      "The Chemical and Hazardous Materials department manages and controls the use, storage, and disposal of potentially harmful substances. This ensures the safe handling of chemicals and materials to prevent environmental damage and protect public health.",
  },
  {
    id: 4,
    question:
      "How does the Natural Resource Protection department contribute to sustainability?",
    answer:
      "The Natural Resource Protection department focuses on the conservation and sustainable use of natural resources. This involves implementing measures to prevent overexploitation, promote biodiversity, and ensure the long-term availability of resources.",
  },
  {
    id: 5,
    question: "What services does the Laboratory Services department provide?",
    answer:
      "The Laboratory Services department offers analytical and testing services to support environmental monitoring and research efforts. This includes analyzing samples for pollutants, conducting research studies, and providing data for informed decision-making.",
  },
  {
    id: 6,
    question: "What is the purpose of the E-waste Management department?",
    answer:
      "The E-waste Management department is responsible for the proper disposal and recycling of electronic waste. This helps minimize the environmental impact of electronic waste and ensures that it is handled in accordance with regulations.",
  },
  {
    id: 7,
    question:
      "How does the Hydrocarbon and Gas Storage department ensure safety?",
    answer:
      "The Hydrocarbon and Gas Storage department oversees the safe storage and handling of hydrocarbons and gases. This includes implementing safety measures, conducting regular inspections, and ensuring compliance with industry standards to prevent accidents and environmental harm.",
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto mb-14 flex w-full max-w-7xl flex-col gap-12 px-4 pt-20 md:mb-28 md:flex-row md:px-8 md:pt-14 2xl:px-0">
      <section className="md:flex-[2]">
        <h3 className="text-xl font-semibold uppercase text-[#212121] md:text-2xl">
          Frequently Asked Questions
        </h3>

        <ul className="mt-5 space-y-5 rounded-xl bg-white px-5 py-6 shadow md:mt-4 md:px-6 md:py-6">
          {faqs.map((faq) => (
            <Faq singleFaq={faq} key={faq.id} />
          ))}
        </ul>
      </section>

      <section className="md:flex-1">
        <h3 className="text-xl font-semibold uppercase text-[#212121] md:text-2xl">
          Contact Us
        </h3>

        <div className="mt-5 space-y-5 rounded-xl bg-white px-5 py-6 shadow md:mt-4 md:px-6 md:py-6">
          <p className="font-medium text-black/50">
            Call the Service Desk for help with your IT requests, questions and
            problems.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-[#DC3837]">
                <MdOutlineMail />
              </div>

              <span className="font-semibold">info@lasepa.gov.ng</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-[#DC3837]">
                <BsFillTelephoneFill />
              </div>

              <span className="font-semibold">
                07046351295 | 08150458638 | 08150458639
              </span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
