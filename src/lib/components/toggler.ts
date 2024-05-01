import { ChocoBase } from "./base.svelte";
import { Togglable } from "../mixins/togglable.svelte";

export class Toggler extends Togglable(ChocoBase<HTMLButtonElement | HTMLInputElement>) {}
