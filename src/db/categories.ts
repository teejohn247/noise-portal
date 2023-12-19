import WaterAndLandIcon from "@/assets/icons/Save Water.svg";
import NaturalResourceProtectionIcon from "@/assets/icons/beach.svg";
import LaboratoryServicesIcon from "@/assets/icons/chemistry.svg";
import ChemicalAndHazardousIcon from "@/assets/icons/factory.svg";
import NoiseIcon from "@/assets/icons/megaphone.svg";
import HydrocarbonAndGasIcon from "@/assets/icons/molecular-structure.svg";
import EWasteManagementIcon from "@/assets/icons/trash-can.svg";
import NoiseImage from "@/assets/images/miguel-a-amutio-27QOmh18KDc-unsplash.jpg";
import { CategoryLink } from "@/types/categoryLink";

type CategoriesData = {
  id: number;
  title: string;
  description: string;
  icon: string;
  href: CategoryLink;
  imagePath: string;
}[];

export const categories: CategoriesData = [
  {
    id: 1,
    title: "Noise and Emission Control",
    description:
      "The noise and emission control department is vested with the responsibilty of protecting residences of the state from Noise pollution amongst others.",
    icon: NoiseIcon,
    href: "noise-and-emission-control",
    imagePath: NoiseImage,
  },
  {
    id: 2,
    title: "Water and Land Pollution Control",
    description:
      "The water and land pollution control department works towards preserving and safeguarding natural water resources and land from pollution and degradation.",
    icon: WaterAndLandIcon,
    href: "in-construction",
    imagePath: "",
  },
  {
    id: 3,
    title: "Chemical and Hazardous Materials",
    description:
      "The chemical and hazardous materials department focuses on managing and controlling the use, storage, and disposal of potentially harmful substances to prevent environmental damage.",
    icon: ChemicalAndHazardousIcon,
    href: "in-construction",
    imagePath: "",
  },
  {
    id: 4,
    title: "Natural Resource Protection",
    description:
      "The natural resource protection department is dedicated to the conservation and sustainable use of natural resources, ensuring their availability for future generations.",
    icon: NaturalResourceProtectionIcon,
    href: "in-construction",
    imagePath: "",
  },
  {
    id: 5,
    title: "Complaint Portal",
    description:
      "Click to visit complaint portal",
    icon: LaboratoryServicesIcon,
    href: "https://www.lasepa.aceall.io",
    imagePath: "",
  },
  {
    id: 6,
    title: "E-waste Management",
    description:
      "The e-waste management department is responsible for the proper disposal and recycling of electronic waste, minimizing its impact on the environment.",
    icon: EWasteManagementIcon,
    href: "in-construction",
    imagePath: "",
  },
  {
    id: 7,
    title: "Hydrocarbon and Gas Storage",
    description:
      "The hydrocarbon and gas storage department oversees the safe storage and handling of hydrocarbons and gases, implementing measures to prevent accidents and environmental harm.",
    icon: HydrocarbonAndGasIcon,
    href: "in-construction",
    imagePath: "",
  },
];
