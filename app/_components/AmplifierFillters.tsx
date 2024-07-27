import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { FaRegMinusSquare } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import FilterElement from "./FilterElement";
import FilterHeader from "./FilterHeader";
import FilterList from "./FilterList";

function AmplifierFillters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  let params = [];

  for (let entry of searchParams.entries()) {
    if (entry[0].includes("-")) {
      params.push(entry[0].split("-")[1]);
    } else {
      params.push(entry[0]);
    }
  }

  const [isOpen, setIsOpen] = useState<string[]>(params || []);

  function handleFilter(name: string, value?: string) {
    const params = new URLSearchParams(searchParams);
    if (params.get(name) === value || !value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"subcategory"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("subcategory")}
      >
        category
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("subcategory")} listLength="short">
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="electric guitar amp"
          onFilter={handleFilter}
        >
          electric guitars amps
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="bass guitar amp"
          onFilter={handleFilter}
        >
          bass guitars amps
        </FilterElement>
        <FilterElement
          elementType="list"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="subcategory"
          queryValue="acoustic guitar amp"
          onFilter={handleFilter}
        >
          ACOUSTIC guitars amps
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"price"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("price")}
      >
        price
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("price")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="price"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"power"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("power")}
      >
        power
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("power")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="power"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"channels"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("channels")}
      >
        channels
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("channels")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="channels"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"memorySlots"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("memorySlots")}
      >
        memory slots
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("memorySlots")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="memorySlots"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"footSwitchConnection"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("footSwitchConnection")}
      >
        foot switch connect
      </FilterHeader>
      <FilterList
        isOpen={isOpen.includes("footSwitchConnection")}
        listLength="short"
      >
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="footSwitchConnection"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="footSwitchConnection"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"headphoneOutput"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("headphoneOutput")}
      >
        headphone output
      </FilterHeader>
      <FilterList
        isOpen={isOpen.includes("headphoneOutput")}
        listLength="short"
      >
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="headphoneOutput"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="headphoneOutput"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"effectsProcessor"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("effectsProcessor")}
      >
        effect&apos;s processor
      </FilterHeader>
      <FilterList
        isOpen={isOpen.includes("effectsProcessor")}
        listLength="short"
      >
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="effectsProcessor"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="effectsProcessor"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"recordingOutput"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("recordingOutput")}
      >
        recording output
      </FilterHeader>
      <FilterList
        isOpen={isOpen.includes("recordingOutput")}
        listLength="short"
      >
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="recordingOutput"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="recordingOutput"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"reverb"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("reverb")}
      >
        reverb
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("reverb")} listLength="short">
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="reverb"
          queryValue="true"
          onFilter={handleFilter}
        >
          yes
        </FilterElement>
        <FilterElement
          elementType="boolean"
          selectedIcon={<IoMdCheckbox />}
          unselectedIcon={<MdCheckBoxOutlineBlank />}
          queryName="reverb"
          queryValue="false"
          onFilter={handleFilter}
        >
          no
        </FilterElement>
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"lineInput"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("lineInput")}
      >
        line input
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("lineInput")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="lineInput"
          onFilter={handleFilter}
        />
      </FilterList>
      <FilterHeader
        openIcon={<FaRegSquarePlus />}
        closeIcon={<FaRegMinusSquare />}
        isOpenName={"weight"}
        setIsOpen={setIsOpen}
        isOpen={isOpen.includes("weight")}
      >
        weight
      </FilterHeader>
      <FilterList isOpen={isOpen.includes("weight")} listLength="short">
        <FilterElement
          elementType="input"
          inputIcon={<HiOutlineArrowNarrowRight />}
          queryName="weight"
          onFilter={handleFilter}
        />
      </FilterList>
    </>
  );
}

export default AmplifierFillters;
