import { Band } from "./band";

export class BandList {
  private bands: Band[];

  constructor() {
    this.bands = [
      new Band('Metallica'),
      new Band('Héroes del Silencio'),
      new Band('Bon Jovi'),
      new Band('Breaking Benjamin'),
    ];
  }

  // Añadir una nueva banda
  public addBand(name: string): Band[] {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  // Eliminar una banda por ID
  public removeBand(id: string): void {
    this.bands = this.bands.filter(band => band.id !== id);
  }

  // Obtener todas las bandas
  public getBands(): Band[] {
    return this.bands;
  }

  // Incrementar los votos de una banda por ID
  public increaseVotes(id: string): void {
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.votes += 1;
      }
      return band;
    });
  }

  // Cambiar el nombre de una banda por ID
  public changeName(id: string, newName: string): void {
    this.bands = this.bands.map(band => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
  }
}
