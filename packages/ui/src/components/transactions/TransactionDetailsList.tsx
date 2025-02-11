import { FC, ReactElement, ReactNode } from "react"
import Divider from "../Divider"
import TransactionDetailItem from "./TransactionDetailsItem"

export interface DetailedItem {
    label: string
    value: string | ReactNode
    noSpace?: boolean
    expandable?: boolean
    decimals?: number
    unitName?: string
    info?: string
}

type TransactionDetailItem = DetailedItem | undefined

interface TransactionDetailsListProps {
    details: TransactionDetailItem[]
}

const TransactionDetailsList: FC<TransactionDetailsListProps> = ({
    details,
}) => {
    return (
        <div>
            {details.map((detail, i) =>
                detail ? (
                    <TransactionDetailItem key={detail.label} item={detail} />
                ) : (
                    <div
                        className="py-3"
                        style={{
                            width: "calc(100% + 1.5rem)",
                            marginLeft: "-0.75rem",
                        }}
                        key={i}
                    >
                        <Divider />
                    </div>
                )
            )}
        </div>
    )
}

export default TransactionDetailsList
