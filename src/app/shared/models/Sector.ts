export interface SectorMain {
    sectorMainId?: string;
    formId?: string;
    sectorId?: string;
    sectorName: string;
    subSectorArr: SectorDetail[];
}

export interface SectorDetail {
    sectorDetailId?: string;
    sectorMainId?: string;
    sectorId?: string;
    subSectorId: string;
    subSectorName: string;
    status: boolean;
    subSectorItemArr: SectorDetail_Items[];
}

export interface SectorDetail_Items {
    sectorDetailItemId?: string;
    sectorDetailId?: string;
    sectorId?: string;
    subSectorId: string;
    subSectorItemId: string;
    subSectorItemName: string;
    status: boolean;
}