"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { TiStar } from "react-icons/ti";
import toast from "react-hot-toast";
import Rating from "./Rating";
import TextExpander from "./TextExpander";
import { createReview } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

function Reviews({
  ratingsCount,
  reviews,
  averageRating,
  productId,
}: {
  ratingsCount: (string | number)[][];
  reviews: {
    _id: string;
    rating: number;
    createdAt: string;
    comment: string;
  }[];
  averageRating: number;
  productId: string;
}) {
  const [isWriting, setIsWriting] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [stars, setStars] = useState<null | number>(null);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleFilter(name: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (params.get(name) === value || !value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const reviewBody: {
    user?: string;
    product?: string;
    rating: any;
    comment: string;
  } = {
    rating: stars,
    comment: newReview,
  };

  async function handleClick() {
    if (!newReview || !stars)
      return toast.error("Please provide comment and rating");
    startTransition(async () => {
      const { status } = await createReview({ productId, reviewBody });
      if (status === 201) {
        setIsWriting(false);
        setStars(null);
        setNewReview("");
      } else toast.error("Please log in");
    });
  }

  return (
    <div className="pb-10 w-[1000px] mx-auto lg:w-full">
      <div className="mt-10 pt-7 px-6 pb-3 border border-primary-700 bg-accent-500 rounded-2xl md:px-0 md:pt-3">
        <div className="flex justify-between items-center">
          <div className="basis-1/2 grid grid-cols-[250px_100px] lg:grid-cols-[2fr_1fr]">
            <div>
              <div
                onClick={() => handleFilter("rating", "1")}
                className="flex text-3xl items-center gap-2 pl-4 py-1 pr-3 cursor-pointer transition-all rounded-xl hover:bg-primary-800"
              >
                <span className="pr-1">1</span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
              </div>
              <div
                onClick={() => handleFilter("rating", "2")}
                className="flex text-3xl items-center gap-2 pl-4 py-1 pr-3 cursor-pointer transition-all rounded-xl hover:bg-primary-800"
              >
                <span className="pr-1">2</span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
              </div>
              <div
                onClick={() => handleFilter("rating", "3")}
                className="flex text-3xl items-center gap-2 pl-4 py-1 pr-3 cursor-pointer transition-all rounded-xl hover:bg-primary-800"
              >
                <span className="pr-1">3</span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
              </div>
              <div
                onClick={() => handleFilter("rating", "4")}
                className="flex text-3xl items-center gap-2 pl-4 py-1 pr-3 cursor-pointer transition-all rounded-xl hover:bg-primary-800"
              >
                <span className="pr-1">4</span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
              </div>
              <div
                onClick={() => handleFilter("rating", "5")}
                className="flex text-3xl items-center gap-2 pl-4 py-1 pr-3 cursor-pointer transition-all rounded-xl hover:bg-primary-800"
              >
                <span className="pr-1">5</span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
                <span className="text-secondary-500">
                  <TiStar />
                </span>
              </div>
            </div>
            <div className="flex flex-col text-3xl items-center gap-2 basis-1/2 py-1 pr-3 text-primary-600">
              {ratingsCount.map((rating) => (
                <span key={rating[0]}>{rating[1]}</span>
              ))}
            </div>
          </div>
          <div className="w-1/2 text-right text-4xl font-bold tracking-widest flex items-center justify-end md:text-3xl">
            <span>{averageRating}/5</span>
            <span className="text-secondary-500 text-5xl md:text-4xl">
              <TiStar />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-7 px-6 pb-3 border border-primary-700 bg-accent-500 rounded-2xl">
        <div className="text-justify pb-2 text-lg font-light">
          {isWriting && (
            <div className="flex justify-center">
              <textarea
                onChange={(e) => setNewReview(e.target.value)}
                className="w-[100%] h-[200px] mx-auto resize-none mb-3 font-light bg-primary-900 border border-primary-700 p-4 focus:outline-primary-700 outline-none"
              ></textarea>
            </div>
          )}
          <div className="flex justify-between content-center pt-2 ">
            {!isWriting ? (
              <button
                disabled={isPending}
                onClick={() => setIsWriting(true)}
                className="mx-auto w-4/5 text-center outline-none cursor-pointer transition-all border-none bg-secondary-500 py-4 px-6 hover:bg-secondary-600 rounded-2xl"
              >
                {isPending ? <SpinnerMini /> : "Write review"}
              </button>
            ) : (
              <>
                <button
                  onClick={handleClick}
                  className="text-center outline-none cursor-pointer transition-all border-none bg-secondary-500 py-4 px-6 hover:bg-secondary-600 rounded-2xl"
                >
                  Add review
                </button>
              </>
            )}
            {isWriting && (
              <Rating editable="true" setStars={setStars} isComment="true" />
            )}
          </div>
        </div>
      </div>
      {reviews.map((review) => (
        <div
          className="mt-10 pt-7 px-6 pb-2 border border-primary-700 bg-accent-500 rounded-2xl transition-all group "
          key={review._id}
        >
          <header className="flex justify-between items-center text-2xl font-bold h-10 px-3 pb-6 tracking-widest border-b border-primary-700">
            <span>
              <Rating rate={review.rating} isComment="true" />
            </span>
            <span className="text-sm font-light text-neutral-700">
              {review.createdAt.split("T")[0]}
            </span>
          </header>
          <div className="text-justify pb-2 pt-2 font-light md:font-normal md:text-lg">
            <TextExpander collapsedNumWords={50}>{review.comment}</TextExpander>
            <div className="w-full flex justify-end ">
              <button className="cursor-pointer border-none text-sm tracking-wider text-red-700 font-bold opacity-0 group-hover:opacity-100 transition-all ">
                report
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
