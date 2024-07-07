import pool from './config/db.js';
import express from 'express';

const app = express()
const port = 3000
// const mysql = require('mysql2/promise')


app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/api/testpost', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

//            SERVICIOS           //

// MOSTRAR SERVICIOS
app.get('/api/servicios', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM servicios');
    // console.log("ROWS -->", rows);
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// CREAR NUEVO SERVICIO
app.post('/api/servicios', async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO servicios SET ?', [req.body]);
    connection.release();
    res.json({ id: result.indertID, nombre, descripcion, precio });
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// MOSTRAR SERVICIO ESPECÍFICO
app.get('/api/servicios/:id', async (req, res) => {
  try {
    const serviceID = req.params.id
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM servicios WHERE idServicio = ?', [serviceID]);
    connection.release();

    if (rows.length === 0) {
      res.status(400).json({ mensaje: 'Servicio no encontrado' })
    } else {
      res.json(rows[0])
    }

  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// ACTUALIZAR SERVICIO
app.post('/api/servicios/:id', async (req, res) => {
  try {
    const serviceID = req.params.id
    const connection = await pool.getConnection();
    const [result] = await connection.query('UPDATE servicios SET ? WHERE idServicio = ?', [req.body, serviceID]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(400).json({ mensaje: 'Servicio no encontrado' })
    } else {
      res.json({ mensaje: 'Servicio actualizado correctament' })
    }
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// BORRAR SERVICIO
app.get('/api/servicios/delete/:id', async (req, res) => {
  try {
    const serviceID = req.params.id
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM servicios WHERE idServicio = ?', [serviceID]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(400).json({ mensaje: 'Servicio no encontrado' })
    } else {
      res.json({ mensaje: 'Servicio eliminado correctament' })
    }
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

//              CLIENTES              //

// MOSTRAR CLIENTES
app.get('/api/clientes', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM clientes');
    // console.log("ROWS -->", rows);
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// CREAR NUEVO CLIENTE
app.post('/api/clientes', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO clientes SET ?', [req.body]);
    connection.release();
    res.json(req.body);
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// MOSTRAR CLIENTE ESPECÍFICO
app.get('/api/clientes/:id', async (req, res) => {
  try {
    const clienteID = req.params.id
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM clientes WHERE idCliente = ?', [clienteID]);
    connection.release();

    if (rows.length === 0) {
      res.status(400).json({ mensaje: 'Cliente no encontrado' })
    } else {
      res.json(rows[0])
    }

  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// ACTUALIZAR CLIENTE
app.post('/api/clientes/:id', async (req, res) => {
  try {
    const clienteID = req.params.id
    const connection = await pool.getConnection();
    const [result] = await connection.query('UPDATE clientes SET ? WHERE idCliente = ?', [req.body, clienteID]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(400).json({ mensaje: 'Cliente no encontrado' })
    } else {
      res.json({ mensaje: 'Cliente actualizado correctament' })
    }
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// BORRAR CLIENTE
app.get('/api/clientes/delete/:id', async (req, res) => {
  try {
    const clienteID = req.params.id
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM clientes WHERE idCliente = ?', [clienteID]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(400).json({ mensaje: 'Cliente no encontrado' })
    } else {
      res.json({ mensaje: 'Cliente eliminado correctament' })
    }
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

//              RESERVAS              //

// MOSTRAR RESERVAS
app.get('/api/reservas', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM reservas');
    // console.log("ROWS -->", rows);
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// CREAR NUEVA RESERVAS
app.post('/api/reservas', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO reservas SET ?', [req.body]);
    connection.release();
    res.json(req.body);
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// MOSTRAR RESERVA ESPECÍFICA
app.get('/api/reservas/:id', async (req, res) => {
  try {
    const reservaID = req.params.id
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM reservas WHERE idReserva = ?', [reservaID]);
    connection.release();

    if (rows.length === 0) {
      res.status(400).json({ mensaje: 'Cliente no encontrado' })
    } else {
      res.json(rows[0])
    }

  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})

// // ACTUALIZAR RESERVAS
// app.post('/api/reservas/:id', async (req, res) => {  
// try {
//   const reservaID = req.params.id
//   const connection = await pool.getConnection();
//   const [result] = await connection.query('UPDATE reservas SET ? WHERE idReserva = ?', [req.body, reservaID]);
//   connection.release();

//   if (result.affectedRows === 0) {
//     res.status(400).json({mensaje: 'Reserva no encontrada'})
//   } else {
//     res.json({mensaje: 'Reserva actualizada correctamene'})
//   }
// } catch (err) {
//   console.error('Error connecting to database', err);
//   res.status(500).send('Internal server error')
// }
// })

// BORRAR RESERVAS
app.get('/api/reservas/delete/:id', async (req, res) => {
  try {
    const reservaID = req.params.id
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM reservas WHERE idReserva = ?', [reservaID]);
    connection.release();

    if (result.affectedRows === 0) {
      res.status(400).json({ mensaje: 'Reserva no encontrada' })
    } else {
      res.json({ mensaje: 'Reserva eliminada correctamente' })
    }
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})


// MOSTRAR SERVICIOS DE RESERVA
app.get('/api/detallereserva/:id', async (req, res) => {
  try {
    const reservaId = req.params.id;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`SELECT servicios.*
                                            FROM servicios
                                            JOIN detallereserva ON servicios.idServicio = detallereserva.idServicio
                                            WHERE detallereserva.idReserva = ?`, [reservaId]);
    connection.release();
    console.log(rows)
    res.json(rows);
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Internal server error')
  }
})




// Abrir el Servidor Web
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})