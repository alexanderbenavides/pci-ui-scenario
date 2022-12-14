import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useRef, useState } from "react";
import { ConvertToCSV, dateFomat, phaPipe } from "./utils/utils";
import { GridGroup } from "./utils/interface";
// modify array data for formating
data.forEach(obj => {
  obj.discovery_date = dateFomat(obj.discovery_date);
  obj.pha = phaPipe(obj.pha);
});
const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" },
  { field: "discovery_date", headerName: "Discovery Date" },
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha", headerName: "Potentially Hazardous" },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, },
];
const title = 'Near-Earth Object Overview'; 
const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<any>();
  const [csvData, setCsvData] = useState('');
  const [rowData, setRowData] = useState(data);
  
  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  const clearFiltersAndSorters = () => {
    // I tried to use the commented code below following the ag-grid documentation to refresh data, but unfortunately didn't work
    /*
    const gridApi = gridRef?.current?.api as GridApi;
    gridApi.refreshCells();
    gridApi.redrawRows();
    gridApi.refreshToolPanel();
    gridApi.resetQuickFilter();
    gridApi.refreshClientSideRowModel('everything');
    */
   
    // alternative solution in 2 steps.
    resetDataGrid();
  };

  const resetDataGrid = () => {
    /**
     * 1.- reset all data
     * 2.- set original data 
     * Note: AgGridReact should be destroyed when array data is empty in order to work this solution
     */
    setRowData([]);
    setTimeout(() =>setRowData(data));

    // Reset textarea
    setCsvData('');    
  }

  const onSelectionChanged = (evt: GridGroup.RowSelection) => {
    setCsvData(ConvertToCSV(evt.api.getSelectedRows()));    
  }

  const buttonStyle = {
    marginLeft: '15px',
    backgroundColor: '#358753',
    cursor: 'pointer',
    border: 'none',
    color: '#ffffff',
    padding: '0.5rem'
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: '100%' }}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h1>{title}</h1>
        <button style={buttonStyle} onClick={clearFiltersAndSorters}>Clear Filters and Sorters</button>
      </div>
      <div>
        {csvData && <p>Copied</p>}
        <textarea 
          defaultValue={csvData}
          cols={100}
          rows={6}
          placeholder='Select at least 1 row to copy'
        >
        </textarea>
      </div>
      { rowData.length !== 0 &&
        <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        suppressExcelExport={true}
        defaultColDef={defaultColDef}
        rowMultiSelectWithClick={true}
        rowSelection={'multiple'}
        onSelectionChanged={onSelectionChanged}
        />
      }
    </div>
  );
};

export default NeoGrid;
