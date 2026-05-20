import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import { positionCrudConfig } from "../../../hooks/positions/positions.model";
import usePositionsData from "../../../hooks/positions/usePositionsData";

const PagePositions = ({}) => {
   // const contextOrganizations = useOrganizationsData();
   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Puesto",
               modalTitleUpdate: "Editar Puesto",
            }}
            hook={usePositionsData()}
            crudConfig={positionCrudConfig}
         />
      </>
   );
};

export default PagePositions;
