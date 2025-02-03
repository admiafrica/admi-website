import styles from "@/assets/css/main.module.css";
import { IContentfulAsset, IContentfulEntry } from "@/types";
import { getAssetDetails } from "@/utils";
import Image from "next/image";

type ReasonsProps = {
  assets: IContentfulAsset[];
  reasons: IContentfulEntry[];
};

export default function CampaignReasons({ assets, reasons }: ReasonsProps) {
  return (
    <div className={`${styles["reasons-to-study-grid"]}`}>
      {reasons.map((reason, index) => (
        <div key={index} className={`${styles["reason-to-study__block"]}`}>
          <div className={`${styles["reason-to-study__icon"]}`}>
            <Image
              src={`https:${
                getAssetDetails(assets, reason.fields.courseUspImage.sys.id)
                  ?.fields.file.url
              }`}
              alt={""}
              width={115}
              height={115}
            />
          </div>
          <h3 className={`${styles["reason-to-study__title"]}`}>
            {reason.fields.courseUspText}
          </h3>
          <p>{reason.fields.courseUspDescription}</p>
        </div>
      ))}
    </div>
  );
}
