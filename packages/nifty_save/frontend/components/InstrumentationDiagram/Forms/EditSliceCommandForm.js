import { defaultTimeCommand } from '../actions'
import { msToTime } from '../formatting'
import { useState } from 'react'

export function EditSliceCommandForm(props) {
  const { onSubmit, isBusy } = props
  const [data, setData] = useState(defaultTimeCommand)

  const cta = isBusy ? 'Sending...' : 'Send Slice'

  const onChangeData =
    (key) =>
    ({ target }) => {
      let _nextData = { ...data }
      _nextData[key] = target?.value || ''
      setData(_nextData)
      console.log(_nextData)
    }

  const fullRange =
    new Date(data.rangeEndTime).getTime() -
      new Date(data.rangeStartTime).getTime() || 0

  const rangeStartAt = Date.now() - new Date(data.rangeStartTime).getTime() || 0
  const rangeEndAt = Date.now() - new Date(data.rangeStartTime).getTime() || 0

  return (
    <div className="grid">
      <span>
        <h3>Api Gateway</h3>
        <h5>Send Time Range to Time Slicer</h5>
        <p>
          Send a larger slice of time to the Slice Command Queue with a targeted
          data source to be partitioned into smaller slices
        </p>
      </span>
      <div className="grid">
        <span className="input">
          <label>Source</label>
          <select
            name="test"
            aria-invalid="false"
            value={data.source}
            onChange={onChangeData('source')}
          >
            <option value="the-graph">The Graph [Eth]</option>
            <option value="nftport-polygon">💀 NFTPort [PolyGon]</option>
            <option value="source-3">💀 Another Source 1</option>
            <option value="source-4">💀 Another Source 2</option>
          </select>
          <label>{`💀 = currently unimplemented`}</label>
        </span>
        <span className="input">
          <label>Range Start</label>
          <input
            value={data.rangeStartTime}
            onChange={onChangeData('rangeStartTime')}
          ></input>
          <label>{`Start At: ${msToTime(rangeStartAt)} ago`}</label>
        </span>
        <span className="input">
          <label>Range End</label>
          <input
            value={data.rangeEndTime}
            onChange={onChangeData('rangeEndTime')}
          ></input>
          <label>{`End at: ${msToTime(rangeEndAt)}`}</label>
          <label>{`Full Range is: ${msToTime(fullRange)}`}</label>
        </span>
        <span className="input">
          <label>Time Slice Size</label>
          <input
            type="number"
            value={data.timesliceSize}
            onChange={onChangeData('timesliceSize')}
          ></input>
          <label>{`Slice Width: ${msToTime(data.timesliceSize)}`}</label>
        </span>
      </div>

      <button
        className="btn hologram interactive"
        enabled={isBusy}
        onClick={() => {
          onSubmit(data)
        }}
      >
        {cta}
      </button>
    </div>
  )
}