import './App.css';
import Accordion from './components/Accordion';

function App() {
  const accordionData = [
    { id: 'row_1', visible: 'Row Visible Part 1', hidden: 'Row Hidden Part 1' },
    { id: 'row_2', visible: 'Row Visible Part 2', hidden: 'Row Hidden Part 2' },
    { id: 'row_3', visible: 'Row Visible Part 3', hidden: 'Row Hidden Part 3' },
    { id: 'row_4', visible: 'Row Visible Part 4', hidden: 'Row Hidden Part 4' },
    { id: 'row_5', visible: 'Row Visible Part 5', hidden: 'Row Hidden Part 5' },
    { id: 'row_6', visible: 'Row Visible Part 6', hidden: 'Row Hidden Part 6' },
    { id: 'row_7', visible: 'Row Visible Part 7', hidden: 'Row Hidden Part 7' },
  ]

  return (
    <div className="App">
      <Accordion
        defaults={{
          isMultiple: false,
          defaultOpenIndexes: ['row_3', 'row_5', 3],
        }}
      >
        {({ onClick, isActive }) => {
          return (
            <div>
              {
                accordionData.map((row) => (
                  <div key={row.hidden} data-id={row.id} onClick={onClick} style={{ borderBottom: '1px solid black', background: 'yellow' }}>
                    <div>{row.visible}</div>
                    {isActive(row.id) && <div>{row.hidden}</div>}
                  </div>
                ))
              }

              <div style={{ marginTop: '5rem' }}>
                {
                  accordionData.map((row) => (
                    <div key={row.hidden} style={{ borderBottom: '1px solid black' }}>
                      <div data-id={row.id} onClick={onClick} style={{ background: 'yellow' }}>{row.visible}</div>
                      {isActive(row.id) && <div>{row.hidden}</div>}
                    </div>
                  ))
                }
              </div>

              <div style={{ marginTop: '5rem' }}>
                {
                  accordionData.map((row, i) => (
                    <div key={row.visible} style={{ borderBottom: '1px solid black' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{row.visible}</div>
                        <button type="button" data-id={i} onClick={onClick} style={{ background: 'yellow' }}>{`${isActive(i) ? 'Close' : 'Open'}`}</button>
                      </div>
                      {isActive(i) && <div>{row.hidden}</div>}
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }}
      </Accordion>
    </div>
  );
}

export default App;
