import BootstrapSwitchButton from "bootstrap-switch-button-react";
import React, { useCallback, useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { ActionButton } from "./../../../components/Button/ActionButton";
import "./AnnotatorNer.css";

import GraphemeSplitter from "grapheme-splitter";
import { TokenAnnotator, TextAnnotator } from "react-text-annotate";
interface AnnotatorNerProps {}

export const AnnotatorNer: React.FC<AnnotatorNerProps> = ({}) => {
  const [state, setState] = useState<any>({
    value: [],
    tag: "PER",
  });
  const [position, setPosition] = useState<any>();
  const [positionEnd, setPositionEnd] = useState<any>();
  const annotationCategory = [
    {
      id: 1,
      name: "PERSON",
      subCategory: [
        {
          id: 1,
          text: "PER",
        },
      ],
    },
    {
      id: 2,
      name: "ORGANIZATION",
      subCategory: [
        {
          id: 1,
          text: "ORG",
        },
      ],
    },
    {
      id: 3,
      name: "LOCATION",
      subCategory: [
        {
          id: 1,
          text: "LOC",
        },
      ],
    },
    {
      id: 4,
      name: "OBJECT",
      subCategory: [
        {
          id: 1,
          text: "OBJ",
        },
      ],
    },
    {
      id: 5,
      name: "FACILITY",
      subCategory: [
        {
          id: 1,
          text: "FC",
        },
      ],
    },
    {
      id: 6,
      name: "EVENT",
      subCategory: [
        {
          id: 1,
          text: "EV",
        },
      ],
    },
    {
      id: 7,
      name: "WORK OF ART",
      subCategory: [
        {
          id: 1,
          text: "WOA",
        },
      ],
    },
    {
      id: 8,
      name: "NUMBER",
      subCategory: [
        {
          id: 1,
          text: "NUM",
        },
      ],
    },
    {
      id: 9,
      name: "TIMESTAMP",
      subCategory: [
        {
          id: 1,
          text: "DATE",
        },
        {
          id: 2,
          text: "TIME",
        },
      ],
    },
    {
      id: 10,
      name: "UNIT",
      subCategory: [
        {
          id: 1,
          text: "U",
        },
      ],
    },
    {
      id: 11,
      name: "OTHER",
      subCategory: [
        {
          id: 1,
          text: "MISC",
        },
      ],
    },
  ];
  const TAG_COLORS: any = {
    ORG: "#00ffa2",
    EV: "#84d2ff",
    PER: "#169254",
    LOC: "#924816",
  };
  var TEXT = `On Monday night Fallon will have Monday The rapper Cardi B who just released her first album`;

  const handleClickTag = useCallback(
    (e: any) => {
      setState({ ...state, tag: e.target.innerText });
    },
    [state]
  );

  useEffect(() => {
    let selectedData = document.querySelectorAll("mark");

    var selection = window.getSelection();

    selectedData.forEach((data) => {
      let selecttext = data?.firstChild?.nodeValue;

      setPosition(TEXT.indexOf(selecttext));
      setPositionEnd(TEXT.indexOf(selecttext) + selecttext.length - 1);
    });
  }, [handleClickTag, TEXT]);

  return (
    <>
      <section>
        <section className="ner-view-header">
          <div>
            <Row>
              <Col lg={6} className="ner-group-header">
                <h4 className="mr-2 ner-heading-text">Keokradong</h4>
                <span className="text-warning ner-header-status">.Running</span>
              </Col>
              <Col lg={6}>
                <span className="ner-annotation-info">
                  Annotated Data: 564/1100
                </span>
              </Col>
            </Row>
            <div></div>
          </div>
        </section>
        <section className="py-3">
          <Row>
            <Col lg={4} className="ner-annotaion-types-section">
              <h6 className="ner-annotation-type-title">Annotation Type</h6>
              <Badge className="ner-annoation-badge">NER 129/500</Badge>
            </Col>
          </Row>
        </section>
        <section className="py-3">
          <Row className="ner-annotation-category ">
            <Col className="py-3" lg={12}>
              <Row className="ner-tag-toggle">
                <span className="mx-2">Tag</span>
                <BootstrapSwitchButton size="xs" />
              </Row>
            </Col>
            <Col className="py-3">
              <Row>
                {annotationCategory.map((cat: any, index: number) => {
                  const { name, id, subCategory } = cat;
                  return (
                    <Col lg={1} md={2} key={id} className="my-2">
                      <h5 className="ner-category">{name}</h5>
                      {subCategory.map((subCat: any, index: number) => {
                        return (
                          <Badge
                            key={index}
                            className={
                              state.tag === subCat.text
                                ? "ner-sub-category-badge-selected"
                                : "ner-sub-category-badge"
                            }
                            onClick={(e) => handleClickTag(e)}
                          >
                            {subCat.text}
                          </Badge>
                        );
                      })}
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </section>
        <section className="py-3">
          <Row className="ner-main-section">
            <Col lg={8} className="ner-annotaion-types-section">
              <TokenAnnotator
                style={{
                  maxWidth: 700,
                  lineHeight: 1.5,
                  margin: "auto",
                  fontSize: "16px",
                }}
                tokens={TEXT.split(" ")}
                value={state.value}
                onChange={(value) => setState({ ...state, value })}
                getSpan={(span) => ({
                  ...span,
                  tag: state.tag,
                  color: TAG_COLORS[state.tag],
                })}
              />
              <span>starting position: {position}</span>
              <span>end position: {positionEnd}</span>
              <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
                {JSON.stringify(state, null, 2)}
              </pre>
              <Row className="justify-content-center">
                <ActionButton className=" ner-submit-button mx-2 my-3">
                  Submit
                </ActionButton>
                <button className="ner-skip-button mx-2 my-3">Skip</button>
                <button className="ner-reject-button mx-2 my-3">Reject</button>
              </Row>
            </Col>
          </Row>
        </section>
      </section>
    </>
  );
};
