import { label } from "../../utils/labels";
const sideBarData = [
    {
        filterTitle: "product category",
        filterData: [
            {
                filterLabel: "gpu",
                filterName: "graphics card",
                payloadInfo: { type: "", payload: "" }
            },
            {
                filterLabel: "laptop",
                filterName: "gaming laptop",

                payloadInfo: { type: "", payload: "" }
            }
        ]
    },
    {
        filterTitle: "availability",
        filterData: [
            {
                filterLabel: "avail",
                filterName: "exclude out of stock",
                payloadInfo: {
                    type: label.EXCLUDE_OUT_OF_STOCK,
                    payload: { flag: label.EXCLUDE_OUT_OF_STOCK }
                }
            }
        ]
    },
    {
        filterTitle: "manufacturer",
        filterData: [
            {
                filterLabel: "acer",
                filterName: "acer",

                payloadInfo: { type: "", payload: "" }
            },
            {
                filterLabel: "nvidia",
                filterName: "nvidia",

                payloadInfo: { type: "", payload: "" }
            },
            {
                filterLabel: "alienware",
                filterName: "alienware",

                payloadInfo: { type: "", payload: "" }
            },
            {
                filterLabel: "aorus",
                filterName: "aorus",

                payloadInfo: { type: "", payload: "" }
            },
            {
                filterLabel: "dell",
                filterName: "dell",

                payloadInfo: { type: "", payload: "" }
            },
            {
                filterLabel: "evga",
                filterName: "evga",

                payloadInfo: { type: "", payload: "" }
            },
            {
                filterLabel: "gigabyte",
                filterName: "gigabyte",

                payloadInfo: { type: "", payload: "" }
            }
        ]
    }
]

export { sideBarData }