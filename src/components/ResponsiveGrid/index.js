import React from "react";
import styled from "styled-components";
import shortid from "shortid";

export const Grid = styled.div``;
export const Headers = styled.span`
  font-weight: bolder;
  @media (max-width: 415px) {
    font-size: 14px;
  }
`;
export const Row = styled.div`
  display: flex;
  :nth-child(even) {
    background-color: #f2f2f2;
  }
`;
export const Title = styled.div`
  @media (max-width: 415px) {
    font-size: 20px;
  }
`;
export const Col = styled.div`
  flex: ${(props) => props.size};
`;

const ResponsiveGrid = (props) => {
  // const d1 = JSON.stringify(props);
  const data = props.data;
  const columns = props.columns;
  const title = props.title;
  const size = props.size;
  //   console.log(columns);
  //   console.log(data);
  return (
    <div className="ResponsiveGrid">
      <Grid>
        <h1>
          <Title>{title}</Title>
        </h1>
        <Row>
          {columns.map((column) => {
            return (
              <Col size={size} key={shortid.generate()}>
                <Headers>{column.Header}</Headers>
              </Col>
            );
          })}
        </Row>
        {data.map((row) => {
          return (
            <Row key={shortid.generate()}>
              {row.name ? <Col size={size}>{row.name}</Col> : ""}
              {row.month ? <Col size={size}>{row.month}</Col> : ""}
              {row.numTransactions ? (
                <Col size={size}>{row.numTransactions}</Col>
              ) : (
                ""
              )}
              {row.points ? <Col size={size}>{row.points}</Col> : ""}
            </Row>
          );
        })}
      </Grid>
    </div>
  );
};
export default ResponsiveGrid;
