import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Card, Container, Row, Col, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const App = () => {

  const [employee, setEmployee] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [showFormEmployee, setShowFormEmployee] = useState(false);

  const getEmployees = async () => {
    Swal.fire("Buscando empleados..");
    Swal.showLoading();
    const { data } = await axios.get("http://localhost:4000/api/get-employees");
    setEmployees(data);
    Swal.close()
  }

  const FormEmployee = () => {
    const onChange = (e) => {
      e.preventDefault();
      const data = employee;
      data[e.target.name] = e.target.value;
      setEmployee(data);
    };

    const submit = async () => {
      Swal.fire(`${isEdit ? "Editando" : "Guardando"} empleado`);
      Swal.showLoading();
      if (isEdit) {
        await axios.put(`http://localhost:4000/api/update-employ/${employee._id}`, employee);
        setIsEdit(false);
      } else {
        await axios.post('http://localhost:4000/api/create-employ', employee);
      }
      Swal.close();
      setShowFormEmployee(false)
      getEmployees();
    }

    return (
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control onChange={onChange} type="text" placeholder="Ingresa un nombre" name="name"
              defaultValue={isEdit ? employee.name : ""}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Edad:</Form.Label>
            <Form.Control onChange={onChange} type="number" placeholder="Ingresa la edad" name="age"
              defaultValue={isEdit ? employee.age : 0}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control onChange={onChange} type="text" placeholder="Ingresa la dirección" name="direction"
              defaultValue={isEdit ? employee.direction : ""}
            />
          </Form.Group>
          <Button onClick={submit} variant={isEdit ? "warning" : "primary"}>{isEdit ? "Actualizar cambios" : "Crear empleado"}</Button>
        </Form>
      </Container>
    )
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const editEmployee = (u) => {
    setEmployee(u);
    setShowFormEmployee(true);
    setIsEdit(true);
  }

  const deleteEmployee = async (id) => {
    Swal.fire("Eliminando usuario");
    Swal.showLoading();
    await axios.delete(`http://localhost:4000/api/delete-employ/${id}`);
    Swal.close();
    getEmployees();
  }


  return (
    <>
      <Container className="m-5 mt-3">
        <Card>
          <Row>
            <Col>
              <Card.Title className="m-2">CRUD de empleados</Card.Title>
            </Col>
            <Col>
            <Button className="m-2" onClick={()=>setShowFormEmployee(true)}>Crear nuevo empleado</Button>
            </Col>
          </Row>
          <Card.Body>
            <Table>
              <thead>
                <th>#</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Direccion</th>
                <th>Opciones</th>
              </thead>
              <tbody>
                {
                  employees?.map(({ _id, name, age, direction }, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{name}</td>
                      <td>{age}</td>
                      <td>{direction}</td>
                      <td>
                        <Row>
                          <Col>
                            <Button variant="warning" onClick={()=>editEmployee({ _id, name, age, direction })}>Editar</Button>
                          </Col>
                          <Col>
                            <Button variant="danger" onClick={()=>deleteEmployee(_id)}>Eliminar</Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <Modal show={showFormEmployee} onHide={()=>setShowFormEmployee(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Editando" : "Crear"} empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body><FormEmployee /></Modal.Body>
      </Modal>
    </>
  )
}

export default App;