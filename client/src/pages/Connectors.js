import React from 'react';

const Connectors = () => {
    var v8 = window.ActiveXObject;
    console.log(v8);
    // let path = 'd:\\';
    // let db = 'baza';
    // let user = 'admin';
    // let password = '141004';
    // let conn = v8.Connect("File='" + path + "';Ref='" + db + "';Usr='" + user + "';Pwd='" + password + "';");
    // let tab = conn.Справочники.Клиенты;
    // let query = conn.NewObject("Запрос");
    // query.text = 'ВЫБРАТЬ ПРЕДСТАВЛЕНИЕ(Клиенты.Статус) КАК КлиентыПоСтатусу, КОЛИЧЕСТВО(Клиенты.Ссылка) КАК Количество ИЗ Справочник.Клиенты КАК Клиенты СГРУППИРОВАТЬ ПО Клиенты.Статус';
    // let Qresult = query.execute().Choose();
    // let strdat = '';
    // let n = 1;
    // while (Qresult.next()) {
    //     strdat += n + "). " + Qresult.КлиентыПоСтатусу + "<br>"; n++;
    // }
    // document.getElementById("message").innerHTML = strdat;
    return (
        <div>
            <div>Connectors page</div>
        </div>
    )
};

export default Connectors;