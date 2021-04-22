import faker from "faker";
const productsData = [
    {
        id: faker.datatype.uuid(),
        name: "NVIDIA GEFORCE RTX 3060 Ti",
        imageUrl: "https://assets.nvidia.partners/images/png/nvidia-geforce-rtx-3060-ti.png",
        specifications: {
            cooling_system: "fan",
            clock_speed: "1.67 Ghz",
            memory_size: "8"
        },
        price: "399",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "NVIDIA GEFORCE RTX 3080",
        imageUrl: "https://assets.nvidia.partners/images/png/nvidia-geforce-rtx-3080.png",
        specifications: {
            cooling_system: "fan",
            clock_speed: "1.71 Ghz",
            memory_size: "10"
        },
        price: "699",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "NVIDIA GEFORCE RTX 3090",
        imageUrl: "https://assets.nvidia.partners/images/png/nvidia-geforce-rtx-3090.png",
        specifications: {
            cooling_system: "fan",
            clock_speed: "1.70 Ghz",
            memory_size: "24"
        },
        price: "1499",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "Gigabyte GeForce RTX 3060 EAGLE 12G",
        imageUrl: "https://assets.nvidia.partners/images/png/GV-N3060EAGLE-12GD.png",
        specifications: {
            cooling_system: "WINDFORCE 2X",
            clock_speed: "--",
            memory_size: "8"
        },
        price: "329",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "ZOTAC GAMING GeForce RTX 3060 Twin Edge",
        imageUrl: "https://assets.nvidia.partners/images/png/zt-a30600e-10m.png",
        specifications: {
            cooling_system: "IceStorm 2.0",
            clock_speed: "1777 Mhz",
            memory_size: "12"
        },
        price: "329",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "ASUS GeForce RTX 3060 DUAL",
        imageUrl: "https://assets.nvidia.partners/images/png/DUAL-RTX3060-12G.png",
        specifications: {
            cooling_system: "Dual Axis-Tech Fans",
            clock_speed: "--",
            memory_size: "12"
        },
        price: "329",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "MSI GeForce RTX 3060 VENTUS 2X 12G",
        imageUrl: "https://assets.nvidia.partners/images/png/RTX-3060-VENTUS-2X-12G.png",
        specifications: {
            cooling_system: "Dual Fan",
            clock_speed: "1777 Mhz",
            memory_size: "12"
        },
        price: "329",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "EVGA GeForce RTX 3060 XC Black GAMING",
        imageUrl: "https://assets.nvidia.partners/images/png/12G-P5-3655-KR.png",
        specifications: {
            cooling_system: "--",
            clock_speed: "1777 Mhz",
            memory_size: "12"
        },
        price: "329",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "Gigabyte GeForce RTX 3070 EAGLE 8G",
        imageUrl: "https://assets.nvidia.partners/images/png/GV-N3070EAGLE-8GD.png",
        specifications: {
            cooling_system: "WINDFORCE 3X",
            clock_speed: "1775 Mhz",
            memory_size: "8"
        },
        price: "499",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "EVGA GeForce RTX 3070 XC3 Black GAMING",
        imageUrl: "https://assets.nvidia.partners/images/png/08G-P5-3751-KR.png",
        specifications: {
            cooling_system: "iCX3",
            clock_speed: "1725 Mhz",
            memory_size: "8"
        },
        price: "599",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "ASUS DUAL-RTX3070-8G",
        imageUrl: "https://assets.nvidia.partners/images/png/DUAL-RTX3070-8G.png",
        specifications: {
            cooling_system: "Dual Axial-Tech Fans",
            clock_speed: "--",
            memory_size: "8"
        },
        price: "624",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "ZOTAC GAMING GeForce RTX 3070 Twin Edge",
        imageUrl: "https://assets.nvidia.partners/images/png/ZT-A30700E-10P.png",
        specifications: {
            cooling_system: "IceStorm 2.0",
            clock_speed: "1275 Mhz",
            memory_size: "8"
        },
        price: "649",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "MSI GeForce RTX 3080 VENTUS 3X 10G",
        imageUrl: "https://assets.nvidia.partners/images/png/ZT-A30700E-10P.png",
        specifications: {
            cooling_system: "Triple Fan",
            clock_speed: "1710 Mhz",
            memory_size: "10 GB"
        },
        price: "699",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "Zotac ZT-A30900D-10P graphics card",
        imageUrl: "https://assets.nvidia.partners/images/png/DE_85807397_100516019_US.png",
        specifications: {
            cooling_system: "IceStorm 2.0",
            clock_speed: "1695 Mhz",
            memory_size: "24 GB"
        },
        price: "1899",
        availability: faker.datatype.boolean()
    },
    {
        id: faker.datatype.uuid(),
        name: "EVGA GeForce RTX 3060 XC GAMING",
        imageUrl: "https://assets.nvidia.partners/images/png/12G-P5-3657-KR.png",
        specifications: {
            cooling_system: "--",
            clock_speed: "--",
            memory_size: "12 GB"
        },
        price: "389",
        availability: faker.datatype.boolean()
    }
]

export { productsData };