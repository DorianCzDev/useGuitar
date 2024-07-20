"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Link from "next/link";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Modal from "react-modal";
import Slider from "react-slick";
import priceFormater from "../_helpers/priceFormater";
import { GrStatusGood, GrStatusWarning } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa6";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/_utils/cartSlice";

type ProductDetailsHeaderProps = {
  product: {
    name: string;
    images: [
      {
        imageURL: string;
        imageId: string;
      }
    ];
    category: string;
    price: number;
    discount: number;
    noDiscountPrice: number;
    inventory: number;
    averageRating: number;
    numOfReviews: number;
    _id: string;
  };
};

function ProductDetailsHeader({ product }: ProductDetailsHeaderProps) {
  const {
    name,
    price,
    inventory,
    images,
    category,
    numOfReviews,
    averageRating,
    noDiscountPrice,
    discount,
    _id: id,
  } = product;

  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currImage, setCurrImage] = useState<number | undefined>(undefined);
  return (
    <header className="mx-auto w-9/12">
      <div>
        {modalIsOpen && (
          <div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                content: {
                  width: "850px",
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  transform: "translate(-50%, -50%)",
                  overflowY: "hidden",
                  overflowX: "hidden",
                  padding: " 32px 0",
                },
                overlay: {
                  backgroundColor: "rgba(19, 23, 32, .9)",
                },
              }}
            >
              <div
                onClick={() => setModalIsOpen(false)}
                className="absolute z-[9999] text-black right-3 top-2 text-3xl cursor-pointer text-prima"
              >
                <FaRegWindowClose />
              </div>
              <Slider
                dots={true}
                slidesToShow={1}
                arrows={true}
                infinite={images.length > 1}
                initialSlide={currImage}
                focusOnSelect={false}
              >
                {images.map((image) => (
                  <div
                    className="relative h-[800px] w-[450px]"
                    key={image.imageId}
                  >
                    <img
                      src={image.imageURL}
                      className="mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] max-w-[450px] max-h-[800px]"
                    />
                  </div>
                ))}
              </Slider>
            </Modal>
          </div>
        )}
        <div className="py-2  text-neutral-400">
          <Link
            href={"/"}
            className="text-sm px-1 capitalize transition-all hover:text-slate-300"
          >
            Home
          </Link>
          <span className="text-sm">{" > "}</span>
          <Link
            href={`/products/${
              category !== "multi effect" ? `${category}s` : "multiEffects"
            }`}
            className="text-sm px-1 capitalize transition-all hover:text-slate-300"
          >{`${category}s`}</Link>
          <span className="text-sm">{" > "}</span>
          <Link
            href={``}
            className="text-sm px-1 capitalize transition-all hover:text-slate-300"
          >
            {name}
          </Link>
        </div>
        <div className="grid grid-cols-[500px_500px] pt-3">
          <div className="h-[600px] w-[500px] bg-white px-4">
            <Slider
              slidesToShow={1}
              arrows={false}
              autoplay={true}
              autoplaySpeed={3000}
              pauseOnDotsHover={true}
              pauseOnHover={true}
              draggable={false}
              infinite={images.length > 1}
              focusOnSelect={false}
            >
              {images.map((image, index) => (
                <div
                  onClick={() => {
                    setModalIsOpen(true);
                    setCurrImage(index);
                  }}
                  key={image.imageId}
                  className="relative h-[600px] w-[500px] cursor-pointer"
                >
                  <img
                    src={image.imageURL}
                    className="mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] max-w-[350px] max-h-[450px]"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="h-[600px] flex justify-center items-center font-bold w-[400px] mx-auto">
            <div className="w-full">
              <h1 className=" pt-5 pb-2 tracking-widest uppercase text-2xl">
                {name}
              </h1>
              <div className="mt-2 py-4 font-bold border-b border-primary-600">
                <div className="text-3xl">
                  ${priceFormater(price)}
                  {discount > 0 && (
                    <span className="ml-3 line-through font-light text-red-600 text-2xl">
                      ${priceFormater(noDiscountPrice)}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-2xl font-bold my-3 tracking-widest py-2 uppercase text-green-700 flex items-center">
                <span className="pr-3 text-2xl">
                  {inventory > 0 ? <GrStatusGood /> : <GrStatusWarning />}
                </span>
                {inventory > 0 ? "In Stock" : "Out Of Stock"}
              </div>
              <button
                onClick={() => dispatch(addItem(id))}
                className="flex w-full items-center justify-center outline-none cursor-pointer transition-all border-none bg-secondary-500 py-4 px-6 rounded-2xl hover:bg-secondary-600"
              >
                <span className="pr-3 text-2xl">
                  <FaCartPlus />
                </span>
                ADD TO CART
              </button>
              <div className="border-t border-primary-600 mt-6 pt-2">
                <Rating
                  editable="false"
                  ratingAverage={averageRating}
                  numOfRatings={numOfReviews}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProductDetailsHeader;
