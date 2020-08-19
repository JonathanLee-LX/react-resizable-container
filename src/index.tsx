import React, { useEffect, useRef, useState } from 'react'
import debounce from 'debounce'
import styles from './styles.module.css'

export interface ResizableContainerProps {
  flex?: React.ReactElement
  fixed?: React.ReactElement
  onFixedHeightChange?: (height: number) => void
  fixedStyle?: React.CSSProperties
  flexStyle?: React.CSSProperties
  style?: React.CSSProperties
  defaultFixedHeight?: number
}

const RESIZE_BAR_HEIGHT = 10
const MIN_FIXED_HEIGHT = 100

const ResizableContainer: React.FC<ResizableContainerProps> = (props) => {
  const {
    fixed,
    flex,
    defaultFixedHeight = 300,
    onFixedHeightChange,
    fixedStyle,
    flexStyle,
    style
  } = props

  const [fixedHeight, setFixedHeight] = useState<number>(defaultFixedHeight)
  const [flexHeight, setFlexHeight] = useState<number>()

  const container = useRef<HTMLDivElement>(null)
  const dragLine = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResize = () => {
      const prevContainerHeight = flexHeight! + fixedHeight + RESIZE_BAR_HEIGHT
      const containerHeight = container.current?.getBoundingClientRect().height
      // 高度不变
      if (prevContainerHeight === containerHeight) return
      const newFlexHeight = Math.floor(
        (containerHeight! - RESIZE_BAR_HEIGHT) / 2
      )
      const newFixedHeight =
        containerHeight! - newFlexHeight - RESIZE_BAR_HEIGHT

      setFlexHeight(newFlexHeight)
      setFixedHeight(newFixedHeight)
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [flexHeight, fixedHeight])

  useEffect(function initialFlexHeight() {
    const containerNode = container.current as HTMLDivElement
    const initialFlexHeight =
      containerNode.getBoundingClientRect().height! -
      fixedHeight -
      RESIZE_BAR_HEIGHT

    setFlexHeight(initialFlexHeight)
  }, [])

  useEffect(() => {
    const resizeLine = dragLine.current as HTMLDivElement
    const containerNode = container.current as HTMLDivElement

    const onMouseMove = debounce((e: MouseEvent) => {
      if (!resizeLine) throw new Error('resizeLine is not attached')

      const containerHeight = container.current?.getBoundingClientRect().height!

      const offsetY =
        e.clientY - container.current?.getBoundingClientRect().top!

      let newFixedHeight = containerHeight - offsetY - RESIZE_BAR_HEIGHT / 2

      newFixedHeight =
        newFixedHeight < MIN_FIXED_HEIGHT ? MIN_FIXED_HEIGHT : newFixedHeight

      const newFlexHeight = containerHeight - newFixedHeight - RESIZE_BAR_HEIGHT

      setFixedHeight(newFixedHeight)
      setFlexHeight(newFlexHeight)

      if (onFixedHeightChange) {
        onFixedHeightChange(fixedHeight)
      }
    }, 10)

    const onMouseDown = () => {
      containerNode.addEventListener('mousemove', onMouseMove)
    }

    const onMouseUp = () => {
      containerNode.removeEventListener('mousemove', onMouseMove)
    }

    resizeLine.addEventListener('mousedown', onMouseDown)

    containerNode.addEventListener('mouseup', onMouseUp)

    return () => {
      containerNode.removeEventListener('mouseup', onMouseUp)
      resizeLine!.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  const mergedFlexStyle: React.CSSProperties = {
    ...flexStyle,
    ...{ height: flexHeight }
  }

  const mergedFixedStyle: React.CSSProperties = {
    ...fixedStyle,
    ...{
      height: fixedHeight
    }
  }

  return (
    <div ref={container} className={styles.container} style={style}>
      <div style={mergedFlexStyle} className={styles.flex}>
        {flex}
      </div>
      <div ref={dragLine} className={styles.dragLine}>
        <i />
        <i />
      </div>
      <div style={mergedFixedStyle} className={styles.fixed} ref={bottom}>
        {fixed}
      </div>
    </div>
  )
}

export default React.memo(ResizableContainer)
