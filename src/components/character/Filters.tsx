import type { CharacterFilters } from '../../types/characters'

export default function Filters({
    filterName,
    setFilterName,
    filterRace,
    setFilterRace,
    filterKi,
    setFilterKi,
    filterAffiliation,
    setFilterAffiliation,
    filterGender,
    setFilterGender,
}: CharacterFilters) {
  return (
    <div className="filter-section">
        <div className="filter-row">
          <div className="form-group">
            <label>Filtrar por Nombre</label>
            <div className="input-with-clear">
            <input
              type="text"
              defaultValue={filterName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                setFilterName(e.currentTarget.value);
                }
              }}
              placeholder="Buscar por nombre..."
            />
            {filterName && (
              <button
                className="clear-btn"
                onClick={() => setFilterName('')}
              >
                x
              </button>
            )}
            </div>
          </div>

          <div className="form-group">
            <label>Filtrar por Raza</label>
            <select value={filterRace} onChange={(e) => setFilterRace(e.target.value)}>
              <option value="">Todas</option>
              <option value="Human">Human</option>
              <option value="Saiyan">Saiyan</option>
              <option value="Namekian">Namekian</option>
              <option value="Majin">Majin</option>
              <option value="Frieza Race">Frieza Race</option>
              <option value="Android">Android</option>
              <option value="Jiren Race">Jiren Race</option>
              <option value="God">God</option>
              <option value="Angel">Angel</option>
              <option value="Evil">Evil</option>
              <option value="Nucleico">Nucleico</option>
              <option value="Nucleico benigno">Nucleico benigno</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

            <div className="form-group">
            <label>Filtrar por Ki</label>
            <div className="input-with-clear">
              <input
              type="text"
              value={filterKi}
              onChange={(e) => setFilterKi(e.target.value)}
              placeholder="Buscar por ki..."
              />
              {filterKi && (
              <button
                className="clear-btn"
                onClick={() => setFilterKi('')}
              >
                x
              </button>
              )}
            </div>
            </div>
          <div className="form-group">
            <label>Filtrar por Afiliación</label>
            <select value={filterAffiliation} onChange={(e) => setFilterAffiliation(e.target.value)}>
              <option value="">Todas</option>
              <option value="Z Fighter">Z Fighter</option>
              <option value="Red Ribbon Army">Red Ribbon Army</option>
              <option value="Namekian Warrior">Namekian Warrior</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Army of Frieza">Army of Frieza</option>
              <option value="Pride Troopers">Pride Troopers</option>
              <option value="Assistant of Vermoud">Assistant of Vermoud</option>
              <option value="God">God</option>
              <option value="Assistant of Beerus">Assistant of Beerus</option>
              <option value="Villain">Villain</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Filtrar por Género</label>
            <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
              <option value="">Todos</option>
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
              <option value="Unknown">Desconocido</option>
            </select>
          </div>

        </div>
        
      </div>
  )
}
