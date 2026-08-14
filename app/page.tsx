import {Container, Row, Col} from 'react-bootstrap';
import {Metadata} from "next";
import AnimatedComponents from "@/components/animated-component/animated-components";

export const metadata: Metadata = {
  title: "Início",
};

export default function Home() {
  return (
    <AnimatedComponents>
      <Container className="d-flex flex-column align-items-center justify-content-center h-100">
        <Row>
          <Col className="text-center">
          </Col>
        </Row>
      </Container>
    </AnimatedComponents>
  );
}
