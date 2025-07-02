"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface PayrollItemProps {
    label: string;
    value?: string;
    icon?: IconType
}
export const PayrollItem = ({
    label,
    value,
    icon: Icon,
}: PayrollItemProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPayrollId = searchParams.get("schoolId");
    const currentTitle = searchParams.get("title");
    const isSelected = currentPayrollId === value;
    const onClick = () => {
        const url = qs.stringifyUrl(
          {
            url: pathname,
            query: {
              title: currentTitle,
              schoolId: isSelected ? null : value,
            },
          },
          { skipNull: true, skipEmptyString: true }
        );
        router.push(url);
    };
    return (
        <button
            onClick={onClick}
        className={cn(
          "py-2 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
          isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
        )}
        type="button"
      >
        {Icon && <Icon size={20} />}
        <div className="truncate">{label}</div>
      </button>
    );
}