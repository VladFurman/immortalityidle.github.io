import { Component } from '@angular/core';
import { AutoBuyerService, AutoBuyerSetting } from '../game-state/autoBuyer.service';
import { CharacterService } from '../game-state/character.service';
import { FollowersService } from '../game-state/followers.service';
import { GameStateService } from '../game-state/game-state.service';
import { HomeService } from '../game-state/home.service';
import { InventoryService, BalanceItem, AutoItemEntry } from '../game-state/inventory.service';
import { MainLoopService } from '../game-state/main-loop.service';
import { AutoSaveService, AutoSaveSettings } from '../game-state/autosave.service';

@Component({
  selector: 'app-options-modal',
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.less']
})
export class OptionsModalComponent {

  constructor(
    public homeService: HomeService,
    public characterService: CharacterService,
    public inventoryService: InventoryService,
    public gameStateService: GameStateService,
    public followerService: FollowersService,
    public autoBuyerService: AutoBuyerService,
    public autoSaveService: AutoSaveService,
    public mainLoopService: MainLoopService
  ) { }

  autoSaveInterval(event:Event){
    if(!(event.target instanceof HTMLInputElement)) return;
    this.gameStateService.changeAutoSaveInterval(parseInt(event.target.value));
  }

  autoSellReserveChange(event: Event, autosellEntry: AutoItemEntry){
    if (!(event.target instanceof HTMLInputElement)) return;
    autosellEntry.reserve = parseInt(event.target.value);
    if (!autosellEntry.reserve){
      autosellEntry.reserve = 0;
    }
  }

  autoUseReserveChange(event: Event, autouseEntry: AutoItemEntry){
    if (!(event.target instanceof HTMLInputElement)) return;
    autouseEntry.reserve = parseInt(event.target.value);
    if (!autouseEntry.reserve){
      autouseEntry.reserve = 0;
    }
  }

  autoBuyLandLimitChanged(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;
    this.homeService.autoBuyLandLimit = parseInt(event.target.value);
    if (!this.homeService.autoBuyLandLimit){
      this.homeService.autoBuyLandLimit = 0;
    }
  }

  autoFieldLimitChanged(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;
    this.homeService.autoFieldLimit = parseInt(event.target.value);
    if (!this.homeService.autoFieldLimit){
      this.homeService.autoFieldLimit = 0;
    }
  }

  autoBuyHomeLimitChanged(event: Event){
    if (!(event.target instanceof HTMLSelectElement)) return;
    this.homeService.autoBuyHomeLimit = parseInt(event.target.value);
  }

  autoPauseThugs(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;
    this.homeService.thugPause = !this.homeService.thugPause;
  }

  useAutoBuyReserveChanged(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;
    this.homeService.useAutoBuyReserve = event.target.checked;
  }

  autoBuyReserveAmountChanged(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;
    this.homeService.autoBuyReserveAmount = parseInt(event.target.value);
    if (!this.homeService.autoBuyReserveAmount){
      this.homeService.autoBuyReserveAmount = 0;
    }
  }

  autoBalanceUseChanged(event: Event, balanceItem: BalanceItem){
    if (!(event.target instanceof HTMLInputElement)) return;
    balanceItem.useNumber = parseInt(event.target.value);
    if (!balanceItem.useNumber){
      balanceItem.useNumber = 0;
    }
  }

  autoBalanceSellChanged(event: Event, balanceItem: BalanceItem){
    if (!(event.target instanceof HTMLInputElement)) return;
    balanceItem.sellNumber = parseInt(event.target.value);
    if (!balanceItem.sellNumber){
      balanceItem.sellNumber = 0;
    }
  }

  useSpiritGemWeaponsChange(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.useSpiritGemWeapons = event.target.checked;
  }

  useSpiritGemPotionsChange(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.useSpiritGemPotions = event.target.checked;
  }

  useCheapestSpiritGemChange(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.useCheapestSpiritGem = event.target.checked;
  }

  autoequipEnableChange(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.autoequipBestEnabled = event.target.checked;
  }

  automergeEquippedChange(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.automergeEquipped = event.target.checked;
  }

  autoSellOldHerbs(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.autoSellOldHerbsEnabled = event.target.checked;
  }

  autoSellOldWood(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.autoSellOldWoodEnabled = event.target.checked;
  }

  autoSellOldOre(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.autoSellOldOreEnabled = event.target.checked;
  }

  autoSellOldBars(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.autoSellOldBarsEnabled = event.target.checked;
  }

  autoSellOldGems(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.autoSellOldGemsEnabled = event.target.checked;
  }

  autoBuySettingsPriorityChanged(index: number, moveUp: boolean): void {
    this.autoBuyerService.autoBuyerSettings.splice(index + (moveUp ? -1 : 1), 0, this.autoBuyerService.autoBuyerSettings.splice(index, 1)[0]);
  }

  autoBuySettingsEnabledChange(event: Event, setting: AutoBuyerSetting): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    setting.enabled = event.target.checked;
  }

  autoBuySettingsWaitForFinishChange(event: Event, setting: AutoBuyerSetting): void {
    if (!(event.target instanceof HTMLInputElement)) return;
    setting.waitForFinish = event.target.checked;
  }

  easyModeChange(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;
    event.preventDefault();
    event.stopPropagation();
    if (this.characterService.characterState.easyMode){
      //coming back from easy mode
      this.characterService.characterState.easyMode = false;
    } else {
      if (!this.gameStateService.easyModeEver){
        if (confirm("This will enable easy mode and mark your save permanently. Are you sure?")){
          this.gameStateService.easyModeEver = true;
        } else {
          event.target.checked = false;
          return;
        }
      }
      this.characterService.characterState.easyMode = true;
    }
  }

  autoBuyFoodChange(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;
    this.inventoryService.autoBuyFood = event.target.checked;
  }

  scientificNotationChange(event: Event){
    if (!(event.target instanceof HTMLInputElement)) return;
    this.mainLoopService.scientificNotation = event.target.checked;
    this.gameStateService.savetoLocalStorage();
    this.gameStateService.loadFromLocalStorage();
  }
} 