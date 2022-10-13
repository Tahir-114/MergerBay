import { SectorMain } from "./Sector";

export interface SellOut {
    sellOut_Id: string;
    projectName: string;
    businessLocation_Id: string;
    subsidiary_Ids?: string;
    sector_Ids?: string;
    subSector_Ids?: string;
    year_Id?: string;
    revenue?: string;
    eBITAY?: string;
    netProfit?: string;
    sellingValue?: number;
    fixedAssets?: number;
    inventoryValue?: number;
    isBankDebit?: boolean;
    isAuditFinancialStatement?: boolean;
    isValuationReport?: boolean;
    transactionRole_Id?: string;
    isMendate?: boolean;
    userId?: string;
    status?: string;
    description?: string;
    type?: string;
    subType?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    created_Date?: Date;
    updated_Date?: Date;
    created_By?: Date;
    updated_By?: Date;
    sectorsArray?: SectorMain[];
}