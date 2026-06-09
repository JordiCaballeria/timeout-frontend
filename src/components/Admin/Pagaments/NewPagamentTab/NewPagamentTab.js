import React from "react";
import { Tab, Loader } from "semantic-ui-react";
import { RealitzarVenta } from "../../Botiga/RealitzarVenta/RealitzarVenta";
import { useProductes } from "../../../../hooks/useProductes";
import { usePagaments } from "../../../../hooks/usePagaments";
import { NovaEntradaForm } from "../../Entrades/NovaEntradaForm/NovaEntradaForm";
import { useEffect } from "react";
import { useEsdeveniments } from "../../../../hooks/useEsdeveniments";
import { useUser } from "../../../../hooks/useUser";
import { NouSociForm } from "../../Users/NouSociForm/NouSociForm";

export default function NewPagamentTab(props) {
  const { onClose, onRefresh } = props;
  const { getProductes, productes, loading: loadingProductes } = useProductes();
  const {
    getTipusPagaments,
    tipusPagament,
    loading: loadingTipus,
  } = usePagaments();
  const {
    getEsdeveniments,
    esdeveniments,
    loading: loadingEsdeveniments,
  } = useEsdeveniments();
  const { getUsers, users, loading: loadingUsers } = useUser();
  useEffect(() => {
    getProductes();
    getTipusPagaments();
    getEsdeveniments();
    getUsers();
  }, []);

  const panes = [
    {
      menuItem: "Productes",
      render: () => (
        <Tab.Pane>
          <RealitzarVenta
            onRefesh={onRefresh}
            onClose={onClose}
            productes={productes}
            tipusPagament={tipusPagament}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Entrades",
      render: () => (
        <Tab.Pane>
          <NovaEntradaForm
            esdeveniments={esdeveniments}
            users={users}
            tipusPagament={tipusPagament}
            onClose={onClose}
            onRefresh={onRefresh}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Alta soci",
      render: () => (
        <Tab.Pane>
          <NouSociForm
            users={users.filter((user) => !user.is_soci)}
            tipusPagament={tipusPagament}
            onClose={onClose}
            onRefresh={onRefresh}
          />
        </Tab.Pane>
      ),
    },
  ];
  if (loadingEsdeveniments || loadingProductes || loadingTipus || loadingUsers)
    return (
      <Loader active inline="centered">
        Carregant...
      </Loader>
    );
  return <Tab panes={panes} />;
}
