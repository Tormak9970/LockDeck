import { Button, Focusable } from "decky-frontend-lib"
import React, { VFC, useState } from "react"
import { BiSolidDownArrow } from "react-icons/bi"

type SectionAccordionProps = {
  label: string,
  isOpen: boolean,
  children: React.ReactNode
}

/**
 * Options Section accordion component
 */
export const SectionAccordion: VFC<SectionAccordionProps> = ({ label, isOpen, children }) => {
  const [open, setOpen] = useState(isOpen);

  function onClick(e: any) {
    e.stopPropagation();
    setOpen(!open);
  }

  return (
    <Focusable style={{ width: "100%", padding: "0" }}>
      <Focusable className="accordion-start-cont" focusClassName="start-focused" focusWithinClassName="start-focused">
        <Button style={{
          width: "100%",
          padding: "0",
          margin: "0",
          background: "transparent",
          outline: "none",
          border: "none",

          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }} onOKButton={onClick} onClick={onClick}>
          <div className="accordion-line" />
          <div className="accordion-label">
            {label}
            <BiSolidDownArrow
              style={{
                animation: "transform 0.2s ease-in-out",
                transform: !open ? "rotate(90deg)" : "",
                fontSize: "0.8em",
                marginLeft: "5px"
              }}
            />
          </div>
          <div className="accordion-line" />
        </Button>
      </Focusable>
      {open && children}
    </Focusable>
  )
}
