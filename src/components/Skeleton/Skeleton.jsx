import React from "react";
import "./skeleton.scss";
// E3E3E3 cccccc

const Skeleton = ({ type }) => {
  const DestSkeletion = () => {
    return (
      <div className="des_container_sk">
        <div className="des_img"></div>
        <div className="des_title"></div>
        <div className="des_para"></div>
      </div>
    );
  };

  const PropertySkeleton = () => {
    return (
      <div className="pro_container">
        <div className="pro_img"></div>
        <div className="pro_title"></div>
        <div className="pro_des"></div>
      </div>
    );
  };

  const FeatutedSkeleton = () => {
    return (
      <div className="featured_container">
        <div className="fe_img"></div>
        <div className="fea_container">
          <div className="fe_pr_para"></div>
          <div className="fe_heading"></div>
          <div className="fe_pr_para"></div>
          <div className="fe_border"></div>
          <div className="fea_price_con">
            <div className="fea_pri_nt"></div>
            <div className="fea_pri_nt"></div>
          </div>
        </div>
      </div>
    );
  };

  if (type === "destination") return <DestSkeletion />;
  if (type === "property") return <PropertySkeleton />;
  if (type === "featured") return <FeatutedSkeleton />;
};

export default Skeleton;
