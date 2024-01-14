const metodosBd = {}
const db = require('../database/db');
const { use } = require('../router/bd');

//!verificar usuario
metodosBd.login = (req, res) => {
    const { user, pass } = req.body
    console.log(user, ":", pass)
    db.findOne({ user: user }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (data && data.user === user && data.pass === pass) {
                console.log("entro")
                console.log(data)
                const datos = {
                    username: user.user,
                    role: 'user',
                    id: data._id,
                    libros: data.libros
                };
                res.json({ success: true, datos });
            } else {

                res.json({ success: false });
            }
        }
    })
}
//! Agregar libros al usuario
metodosBd.addBooks = (req, res) => {
    const userId = req.params.id;
    const idBook = req.body.book;
    db.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const allBook = user.libros
            if (!allBook.includes(idBook)) {
                user.libros.push(idBook)
                const updatedUser = user;
                db.update({ _id: userId }, { $set: updatedUser }, {}, (err, numReplaced) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({ message: `Usuario actualizado: ${numReplaced} registros modificados`, success: true, accion: "add" });
                    }
                });
            } else {
                res.json({ success: false, accion: "existe" });
                console.log("el libro existe")
            }

        }
    });
}
//! optener los libros del usuario
metodosBd.getBookUser = (req, res) => {
    const userId = req.params.id;
    db.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user.libros);
        }
    });
}
//? crud database
//!Consultar datos
metodosBd.get = (req, res) => {
    db.find({}, (err, datos) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(datos)
        }
    })
}
//!Consutar datos por id
metodosBd.getId = (req, res) => {
    const userId = req.params.id;
    db.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
}
//!INSERTAR DATOS
metodosBd.insert = (req, res) => {
    const { user, pass } = req.body
    db.findOne({ user: user }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (user) {
                res.json({ exists: true });
            } else {
                const data = {
                    user: req.body.user,
                    pass: req.body.pass,
                    libros: []
                }
                db.insert(data, (err, user) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(user);
                    }
                });

            }
        }
    });

}

//!borrar datos
metodosBd.deleted = (req, res) => {
    const userId = req.params.id;
    db.remove({ _id: userId }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: `Usuario eliminado: ${numRemoved} registros eliminados` });
        }
    });
}

//!borrar todos datos
metodosBd.deleteAll = ((req, res) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: `Todos los usuarios eliminados: ${numRemoved} registros eliminados` });
        }
    });
});

// ! actualilzar datos
metodosBd.update = (req, res) => {
    const userId = req.params.id;
    const dataTxt = req.body.dataTxt;
    db.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            user.contenido.push(dataTxt)
            const updatedUser = user;
            db.update({ _id: userId }, { $set: updatedUser }, {}, (err, numReplaced) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({ message: `Usuario actualizado: ${numReplaced} registros modificados` });
                }
            });

        }
    });
}
module.exports = metodosBd;