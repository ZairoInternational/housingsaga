import { Building, Calendar1, User } from "lucide-react"

import { cn } from "@/lib/utils"

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  return (
    <article className={cn(`flex justify-center sm:justify-between w-[85%] gap-y-2 flex-wrap p-6 rounded-lg bg-secondary dark:bg-secondary gap-x-2 border shadow-lg`, className)}>

      {/* Location */}
      <div className=" flex grow items-center gap-x-1 border border-neutral-300 dark:border-neutral-600 p-4 rounded-md">
        <Building className=" size-4 sm:size-6" />
        <input
          type="text"
          placeholder="Where are you going?"
          className=" outline-none p-2 font-extralight text-sm"
        />
      </div>

      {/* Check In - Check Out */}
      <div className=" flex grow items-center gap-x-1 border border-neutral-300 dark:border-neutral-600 p-4 rounded-md">
        <Calendar1 className=" size-4 sm:size-6" />
        <input
          type="text"
          placeholder="Check In - Check Out"
          className=" outline-none p-2 font-extralight text-sm"
        />
      </div>


      {/* Guests */}
      <div className=" flex w-full xl:w-auto grow items-center gap-x-1 border border-neutral-300 dark:border-neutral-600 p-4 rounded-md">
        <User className=" size-4 sm:size-6" />
        <input
          type="text"
          placeholder="Childrens - Adults - Infants"
          className=" outline-none p-2 font-extralight text-sm"
        />
      </div>


      {/* Search Button */}
      <button className=" bg-teal-600 hover:bg-teal-900 px-10 py-5 rounded-lg font-semibold text-white grow cursor-pointer">
        Search
      </button>


    </article>
  )
}
export default SearchBar