import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Button from "../button/Button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getVisiblePages = () => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...")
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages)
        } else {
            rangeWithDots.push(totalPages)
        }

        return rangeWithDots
    }

    const visiblePages = getVisiblePages()

    return (
        <div className="flex items-center justify-center space-x-2">
            {/* Previous Button */}
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="border-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Page Numbers */}
            {visiblePages.map((page, index) => (
                <div key={index}>
                    {page === "..." ? (
                        <div className="px-3 py-2 text-gray-400">
                            <MoreHorizontal className="w-4 h-4" />
                        </div>
                    ) : (
                        <Button
                            onClick={() => onPageChange(page)}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className={
                                currentPage === page
                                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                                    : "border-gray-600 text-white hover:bg-gray-700"
                            }
                        >
                            {page}
                        </Button>
                    )}
                </div>
            ))}

            {/* Next Button */}
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
                className="border-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    )
}