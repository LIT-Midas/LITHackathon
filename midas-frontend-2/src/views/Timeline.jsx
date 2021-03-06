/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useContext } from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
import { Button, Card, CardHeader, CardBody, NavItem, NavLink, Nav, Progress, Table, Container, Row, Col } from 'reactstrap';
// core components
import { chartOptions, parseOptions, chartExample1, chartExample2 } from '../variables/charts.js';
import Header from '../components/Headers/Header.js';

import MidasTimeline from '../components/Timeline/Timeline';
import { CaseContext } from '../services/case.js';

const Timeline = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState('data1');
  const { caseName } = useContext(CaseContext);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data('data' + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        <Row>
          <Col className='mb-5 mb-xl-0'>
            <Card className='bg-gradient-default shadow'>
              <CardHeader className='bg-transparent'>
                <Row className='align-items-center'>
                  <div className='col'>
                    <h6 className='text-uppercase text-light ls-1 mb-1'>Overview</h6>
                    <h2 className='text-white mb-0'>{caseName + ' Timeline' ?? 'Case Timeline'}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <MidasTimeline />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Timeline;
