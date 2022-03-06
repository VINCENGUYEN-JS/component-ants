import * as React from "react";
import Code from "./Code";
import "./style/index.scss";

type APIProps = {
  property: string;
  description: string;
  type: string;
  default: string;
  title?: string;
};

type ComponentDocProps = {
  title: string;
  introduction: string;
  children?: React.ReactNode;
  api?: APIProps[] | APIProps[][];
  apiIntroduction?: string;
  code?: string;
};
function isObject(obj: any) {
  return (
    obj != null && obj.constructor.name === "Object" && !Array.isArray(obj)
  );
}

const ComponentDoc = (props: ComponentDocProps) => {
  const { title, introduction, api, apiIntroduction, code, children } = props;
  const tableAPI = (
    <section className="markdown api-container">
      <h2>
        <span>API</span>
      </h2>
      {apiIntroduction && <p>{apiIntroduction}</p>}
      {!api ? null : isObject(api[0]) ? (
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            {(api as APIProps[]).map((data) => {
              return (
                <tr>
                  <td>{data.property}</td>
                  <td>{data.description}</td>
                  <td>{data.type}</td>
                  <td>{data.default}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        (api as APIProps[][]).map((array) => {
          return (
            <>
              <h3>
                <span>{array[0].title}</span>
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((data) => {
                    return (
                      <>
                        <tr>
                          <td>{data.property}</td>
                          <td>{data.description}</td>
                          <td>{data.type}</td>
                          <td>{data.default}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        })
      )}
    </section>
  );
  return (
    <section className="markdown">
      <h1>{title}</h1>
      <p>{introduction}</p>
      <h2>Examples</h2>
      {children}
      {code && (
        <>
          <h2>How to use it</h2>
          <Code code={code} language="javascript" />
        </>
      )}
      {api && tableAPI}
    </section>
  );
};

export default ComponentDoc;
