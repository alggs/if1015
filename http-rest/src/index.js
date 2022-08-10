const express = require("express");

const app = express();

app.use(express.json());

const localhostPrefix = "http://localhost:8080/";

let dias = [
    {
        "id": 1,
        "name": "segunda",
        "tarefas": [],
        "links": []
    },
    {
        "id": 2,
        "name": "terca",
        "tarefas": [],
        "links": []
    },
    {
        "id": 3,
        "name": "quarta",
        "tarefas": [],
        "links": []
    },
    {
        "id": 4,
        "name": "quinta",
        "tarefas": [],
        "links": []
    },
    {
        "id": 5,
        "name": "sexta",
        "tarefas": [],
        "links": []
    },
    {
        "id": 6,
        "name": "sabado",
        "tarefas": [],
        "links": []
    },
    {
        "id": 7,
        "name": "domingo",
        "tarefas": [],
        "links": []
    }
]

let link = {
    "href": localhostPrefix,
    "type": ""
}

buildLink = (pre, pos, id, rel, type, tarefaId) => {
    let linkItem = Object.assign({}, link);

    if (pos) {
        linkItem.href = linkItem.href + pre + "/" + id + "/" + pos;
    } else {
        linkItem.href = linkItem.href + pre + "/" + id;
    }

    if (tarefaId) {
        linkItem.href = linkItem.href + "/" + tarefaId
    }
    linkItem.rel = rel;
    linkItem.type = type;
    return linkItem;
}

app.get("/days", (req, res) => {
    dias.forEach(d => {
        if (d.links.length == 0) {
            d.links.push(buildLink("days", null, d.id, "days", "GET"));
            d.links.push(buildLink("days", null, d.id, "days", "GET", "tarefas"));
        }
    });
    res.status(200).json(dias);

})

app.get("/days/:id", (req, res) => {
    const { id } = req.params;

    let dia = dias[id - 1];
    if (dia) {
        return res.status(200).json(dias[id - 1]);
    }
    return res.status(500).json({
        "apiMessage": "TESTANDO SE É JSON MESMO",
        "statusCode": 500,
        "additionalMessage": {}
    });

})

app.get("/days/:id/tarefas", (req, res) => {
    const { id } = req.params;

    let dia = dias[id - 1];
    if (dia) {
        return res.status(200).json(dias[id - 1].tarefas);
    }
    return res.status(500).json({
        "apiMessage": "TESTANDO SE É JSON MESMO",
        "statusCode": 500,
        "additionalMessage": {}
    });

})

app.get("/days/:id/tarefas/:tarefaId", (req, res) => {
    const { id, tarefaId } = req.params;

    let dia = dias[id - 1];
    if (dia) {
        let tarefa = dia.tarefas.filter(f => f.id == tarefaId);
        if (tarefa[0]) {
            return res.status(200).json(tarefa[0]);
        }

        return res.status(500).json({
            "apiMessage": "Tarefa não encontrada",
            "statusCode": 500,
            "additionalMessage": {}
        });
    }
    return res.status(500).json({
        "apiMessage": "Dia não encontrado",
        "statusCode": 500,
        "additionalMessage": {}
    });

})

app.delete("/days/:id/tarefas/:tarefaId", (req, res) => {
    const { id, tarefaId } = req.params;

    let dia = dias[id - 1];

    let index = dia.tarefas.findIndex(t => t.id == tarefaId);
    if (index > -1) {
        dia.tarefas.splice(index, 1)
    }

    return res.status(200).json();

})


app.put("/days/:id/tarefas/:tarefaId", (req, res) => {
    const { id, tarefaId } = req.params;

    let dia = dias[id - 1];

    let index = dia.tarefas.findIndex(t => t.id == tarefaId);
    if (index > -1) {
        try {
            let { description } = req.body;
            let tarefa = dia.tarefas[index];
            tarefa.description = description;

        } catch (error) {
            return res.status(500).json({
                "apiMessage": 'Objeto inválido',
                "statusCode": 500,
                "additionalMessage": {}
            });
        }
    }

    return res.status(200).json();

})

app.post("/days/:dayId/tarefas", (req, res) => {
    const { dayId } = req.params;
    let day = dias[dayId]
    if (!day) {
        return res.status(500).json({
            "apiMessage": 'ID ' + dayId + ' é inválido',
            "statusCode": 500,
            "additionalMessage": {}
        });
    }
    try {
        let { id, description } = req.body;
        let dayFilter = dias.filter(d => d.id == dayId);
        let tarefa = { "id": id, "description": description, "links": [] }

        tarefa.links.push(buildLink("days", "tarefas", dayId, "tarefas", "GET"))
        tarefa.links.push(buildLink("days", "tarefas", dayId, "tarefa", "GET", id))
        tarefa.links.push(buildLink("days", "tarefas", dayId, "tarefa", "POST", id))
        tarefa.links.push(buildLink("days", "tarefas", dayId, "tarefa", "PUT", id))
        tarefa.links.push(buildLink("days", "tarefas", dayId, "tarefa", "DELETE", id))

        dayFilter[0].tarefas.push(tarefa)
        return res.status(201).json(tarefa);
    } catch (error) {
        return res.status(500).json({
            "apiMessage": 'Objeto inválido',
            "statusCode": 500,
            "additionalMessage": {}
        });
    }
})

app.listen(8080, () => console.log("Server on"));