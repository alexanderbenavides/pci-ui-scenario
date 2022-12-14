import { ColumnApi, GridApi } from "ag-grid-community";

export namespace GridGroup {
    export interface TableData {
        designation: string;
        discovery_date: Date;
        h_mag: string;
        moid_au: string;
        q_au_1: string;
        q_au_2: string;
        period_yr: string;
        i_deg: string;
        pha: string;
        orbit_class: string;
    }

    export interface RowSelection {
        api: GridApi;
        columnApi: ColumnApi;
        context: any;
        type: string;
    }
}