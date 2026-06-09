import React, { useState } from "react";
import NewPagamentTab from "../../components/Admin/Pagaments/NewPagamentTab/NewPagamentTab";

export function AdminBotiga() {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => setRefresh((prev) => !prev);

  return (
    <div>
      <NewPagamentTab onRefresh={onRefresh} />
    </div>
  );
}
