import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
      {...props}
    >
      {children}
      <motion.div
        initial={{ rotate: 0, scale: 1 }}
        animate={{ 
          rotate: props["data-state"] === "open" ? 180 : 0,
          scale: props["data-state"] === "open" ? 1.2 : 1
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.33, 1, 0.68, 1],
          scale: { type: "spring", stiffness: 500, damping: 15 }
        }}
      >
        <ChevronDown className="h-4 w-4 shrink-0" />
      </motion.div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm"
    {...props}
    asChild
  >
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ height: 0, opacity: 0, scale: 0.95 }}
        animate={{ 
          height: "auto", 
          opacity: 1,
          scale: 1,
          transition: { 
            height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
            opacity: { duration: 0.5, ease: "easeOut" },
            scale: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
          } 
        }}
        exit={{ 
          height: 0, 
          opacity: 0,
          scale: 0.95,
          transition: { 
            height: { duration: 0.3, ease: "easeIn" },
            opacity: { duration: 0.2, ease: "easeIn" },
            scale: { duration: 0.3, ease: "easeIn" }
          } 
        }}
      >
        <motion.div 
          initial={{ y: 10 }}
          animate={{ 
            y: 0,
            transition: { 
              duration: 0.4,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.1
            }
          }}
          className={cn("pb-4 pt-0", className)}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
